-- Datos de prueba: categorías
INSERT INTO categorias (nombre) VALUES
  ('Electrónica'),
  ('Ropa'),
  ('Alimentos'),
  ('Hogar'),
  ('Deportes');

-- Datos de prueba: productos
INSERT INTO productos (nombre, descripcion, precio, stock, categoria_id, imagen_url) VALUES
  ('Audífonos Bluetooth', 'Audífonos inalámbricos con cancelación de ruido', 899.99, 25, 1, 'https://ejemplo.com/audifonos.jpg'),
  ('Playera Polo', 'Playera de algodón 100%, talla M', 299.00, 50, 2, NULL),
  ('Café Molido 500g', 'Café de altura, tueste medio', 120.00, 100, 3, NULL),
  ('Silla Gamer', 'Silla ergonómica con soporte lumbar', 2499.00, 8, 4, NULL),
  ('Pelota de Fútbol', 'Balón oficial tamaño 5', 350.00, 30, 5, NULL);