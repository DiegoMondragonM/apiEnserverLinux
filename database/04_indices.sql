-- =========================================
-- 04_indices.sql
-- Índices
-- =========================================

CREATE INDEX IF NOT EXISTS idx_productos_nombre
ON productos(nombre);

CREATE INDEX IF NOT EXISTS idx_productos_categoria
ON productos(categoria_id);

CREATE INDEX IF NOT EXISTS idx_productos_activo
ON productos(activo);