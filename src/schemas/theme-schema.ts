import { z } from "zod";

export const manifestSchema = z.object({
  name: z.string().min(3).max(50),
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  author: z.string().min(2),
  minSaaSVersion: z.string().regex(/^\d+\.\d+\.\d+$/),
  description: z.string().optional(),
});

export const configSchema = z.object({
  theme: z.object({
    colors: z.object({
      primary: z.string(),
      secondary: z.string(),
      accent: z.string(),
      background: z.string(),
      foreground: z.string(),
    }),
    fonts: z.object({
      heading: z.string(),
      body: z.string(),
    }),
  }),
  enabledSections: z.array(z.string()),
});

export type Manifest = z.infer<typeof manifestSchema>;
export type ThemeConfig = z.infer<typeof configSchema>;
