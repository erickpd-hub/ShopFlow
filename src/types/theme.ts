export interface ThemeGlobalStyles {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    accent?: string;
  };
  fonts?: {
    heading: string;
    body: string;
  };
  borders?: string;
  favicon?: string;
}

export interface SectionSettings {
  [key: string]: any;
}

export interface ThemeSection {
  id: string; // Identificador único de la sección
  type: string; // Ej: 'hero', 'product-grid'
  settings: SectionSettings; // Configuraciones específicas de la sección
  order: number; // Orden en el que debe aparecer
}

export interface ThemeSchema {
  global: ThemeGlobalStyles; // Variables globales como colores tipografías
  sections: ThemeSection[]; // Array de secciones a renderizar
}
