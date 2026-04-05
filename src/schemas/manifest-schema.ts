import { z } from "zod";

export const manifestSchema = z.object({
  name: z.string().min(3).max(50),
  version: z.string().regex(/^\d+\.\d+\.\d+$/),
  author: z.string().min(2),
  minSaaSVersion: z.string().regex(/^\d+\.\d+\.\d+$/),
});

export const configSchema = z.object({
  colors: z.object({
    primary: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).optional(),
    secondary: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).optional(),
  }).optional(),
  fonts: z.object({
    heading: z.string().optional(),
    body: z.string().optional(),
  }).optional(),
  enabledSections: z.array(z.string()),
});

export type Manifest = z.infer<typeof manifestSchema>;
export type ThemeConfig = z.infer<typeof configSchema>;
