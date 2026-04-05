-- Migration para tabla separada de temas, que permite a las tiendas tener múltiples "plantillas" (max 3, etc)
CREATE TABLE store_themes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES stores(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  theme_json JSONB NOT NULL,
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS de Temas
ALTER TABLE store_themes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active themes" ON store_themes FOR SELECT USING (is_active = true);
CREATE POLICY "Owners can manage own themes" ON store_themes FOR ALL USING (
  EXISTS (SELECT 1 FROM stores WHERE id = store_themes.store_id AND owner_id = auth.uid())
);
