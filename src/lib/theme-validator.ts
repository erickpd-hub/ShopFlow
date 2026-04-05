import AdmZip from "adm-zip";
import { manifestSchema, configSchema } from "@/schemas/manifest-schema";

export type ValidationError = {
  error: "INVALID_FORMAT" | "MAX_SIZE_EXCEEDED" | "SECURITY_REJECTION" | "MISSING_FILE" | "INVALID_STRUCTURE" | "CODE_VIOLATION";
  detail: string;
};

const MAX_SIZE = 50 * 1024 * 1024; // 50MB
const PROHIBITED_EXTENSIONS = [".exe", ".sh", ".php", ".env", ".cmd", ".bat"];
const ALLOWED_CDN_DOMAINS = ["images.unsplash.com", "res.cloudinary.com", "supabase.co"];
const PEER_DEPS = ["react", "framer-motion", "lucide-react", "clsx", "tailwind-merge", "next-themes", "radix-ui", "react-hook-form", "zod", "sonner", "ai", "@ai-sdk/react", "next"];

export async function validateThemePackage(buffer: Buffer): Promise<{ 
  success: boolean; 
  error?: ValidationError;
  data?: { manifest: any; config: any; preview: AdmZip.IZipEntry }
}> {
  // 1. Weight check (Stream-style check handled by Next.js already, but we re-check here)
  if (buffer.length > MAX_SIZE) {
    return { success: false, error: { error: "MAX_SIZE_EXCEEDED", detail: "El archivo supera el límite de 50MB" } };
  }

  try {
    const zip = new AdmZip(buffer);
    const zipEntries = zip.getEntries();
    const fileNames = zipEntries.map(e => e.entryName);

    // 2. Security Scan
    for (const fileName of fileNames) {
      if (PROHIBITED_EXTENSIONS.some(ext => fileName.toLowerCase().endsWith(ext))) {
        return { success: false, error: { error: "SECURITY_REJECTION", detail: `Formato prohibido detectado: ${fileName}` } };
      }
      if (fileName.includes("node_modules/")) {
        return { success: false, error: { error: "SECURITY_REJECTION", detail: "node_modules no permitido en el ZIP del tema" } };
      }
    }

    // 3. Structure Check
    const requiredFiles = ["manifest.json", "config.json", "preview.png"];
    for (const rf of requiredFiles) {
      if (!fileNames.some(f => f === rf)) {
        return { success: false, error: { error: "MISSING_FILE", detail: `El archivo ${rf} es obligatorio` } };
      }
    }

    const componentsFolder = zipEntries.some(e => e.entryName.startsWith("components/") && e.entryName.endsWith(".tsx"));
    if (!componentsFolder) {
      return { success: false, error: { error: "MISSING_FILE", detail: "La carpeta /components debe contener componentes (.tsx)" } };
    }

    // 4. Schema Validation (Strict Zod check)
    const manifestEntry = zip.getEntry("manifest.json");
    const configEntry = zip.getEntry("config.json");
    const previewEntry = zip.getEntry("preview.png");

    if (!manifestEntry || !configEntry || !previewEntry) {
      return { success: false, error: { error: "INVALID_FORMAT", detail: "Error al leer archivos mandatorios del zip" } };
    }

    const manifestJson = JSON.parse(manifestEntry.getData().toString("utf8"));
    const configJson = JSON.parse(configEntry.getData().toString("utf8"));

    const manifestResult = manifestSchema.safeParse(manifestJson);
    if (!manifestResult.success) {
      return { success: false, error: { error: "INVALID_STRUCTURE", detail: `manifest.json: ${manifestResult.error.issues[0].message}` } };
    }

    const configResult = configSchema.safeParse(configJson);
    if (!configResult.success) {
      return { success: false, error: { error: "INVALID_STRUCTURE", detail: `config.json: ${configResult.error.issues[0].message}` } };
    }

    // 5. Code & Security Analysis (Static check)
    for (const entry of zipEntries) {
      const isCode = entry.entryName.endsWith(".tsx") || entry.entryName.endsWith(".ts") || entry.entryName.endsWith(".css");
      if (isCode) {
        const content = entry.getData().toString("utf8");

        // Tailwind Check: Must use dynamic variables for core styling
        // Example check: any color class not containing [var(--
        const hardcodedColors = content.match(/\b(text|bg|border)-(red|blue|gray|zinc|neutral|slate)-\d{2,3}\b/g);
        if (hardcodedColors && hardcodedColors.length > 3) { // Allow tiny amount but forbid many
          return { success: false, error: { error: "CODE_VIOLATION", detail: `Se bloqueó ${entry.entryName} por exceso de colores estáticos. Usa text-[var(--primary)].` } };
        }

        // Hardcoded URLs Check
        const urlMatches = content.match(/https?:\/\/[^\s'"]+/g);
        if (urlMatches) {
          for (const url of urlMatches) {
            try {
              const domain = new URL(url).hostname;
              if (!ALLOWED_CDN_DOMAINS.some(d => domain.includes(d))) {
                return { success: false, error: { error: "CODE_VIOLATION", detail: `URL no permitida (${domain}) en ${entry.entryName}` } };
              }
            } catch (e) { /* ignore malformed urls */ }
          }
        }

        // Performance check: third party libraries
        if (content.includes("import") || content.includes("from")) {
            const externalImports = content.match(/from\s+['"]([^.][^'"]+)['"]/g);
            if (externalImports) {
                for (const imp of externalImports) {
                    const lib = imp.match(/['"]([^'"]+)['"]/)?.[1];
                    if (lib && !PEER_DEPS.some(pd => lib.startsWith(pd))) {
                        return { success: false, error: { error: "CODE_VIOLATION", detail: `Librería '${lib}' no permitida en ${entry.entryName}. Usa peer dependencies.` } };
                    }
                }
            }
        }
      }
    }

    return { 
      success: true, 
      data: { manifest: manifestJson, config: configJson, preview: previewEntry } 
    };

  } catch (err: any) {
    return { success: false, error: { error: "INVALID_FORMAT", detail: `El ZIP está corrupto o mal formado: ${err.message}` } };
  }
}
