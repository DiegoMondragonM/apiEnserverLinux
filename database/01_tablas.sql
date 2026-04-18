-- =========================================
-- 01_tablas.sql
-- Crea tablas principales
-- =========================================

CREATE TABLE IF NOT EXISTS categorias (
  id          SERIAL PRIMARY KEY,
  nombre      VARCHAR(100) NOT NULL UNIQUE,
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS productos (
  id            SERIAL PRIMARY KEY,
  nombre        VARCHAR(255) NOT NULL,
  descripcion   TEXT,
  precio        DECIMAL(10, 2) NOT NULL CHECK (precio >= 0),
  stock         INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
  categoria_id  INTEGER REFERENCES categorias(id) ON DELETE SET NULL,
  imagen_url    TEXT,
  activo        BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMP DEFAULT NOW(),
  updated_at    TIMESTAMP DEFAULT NOW()
);