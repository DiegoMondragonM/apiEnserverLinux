-- =========================================
-- 03_triggers.sql
-- Triggers
-- =========================================

DROP TRIGGER IF EXISTS trigger_updated_at ON productos;

CREATE TRIGGER trigger_updated_at
BEFORE UPDATE ON productos
FOR EACH ROW
EXECUTE FUNCTION actualizar_updated_at();