const pool = require('../db/pool');

const transformarProducto = (producto) => ({
  ...producto,
  precio: parseFloat(producto.precio)
});
// GET /productos
const listarProductos = async (req, res, next) => {
  try {
    const { categoria_id, activo = true, buscar } = req.query;

    let query = `
      SELECT p.*, c.nombre AS categoria
      FROM productos p
      LEFT JOIN categorias c ON p.categoria_id = c.id
      WHERE p.activo = $1
    `;
    const params = [activo];

    if (categoria_id) {
      params.push(categoria_id);
      query += ` AND p.categoria_id = $${params.length}`;
    }

    if (buscar) {
      params.push(`%${buscar}%`);
      query += ` AND p.nombre ILIKE $${params.length}`;
    }

    query += ' ORDER BY p.created_at DESC';

    const { rows } = await pool.query(query, params);
    const datos=rows.map(transformarProducto);
    res.json({ ok: true, total: rows.length, datos});
  } catch (err) {
    next(err);
  }
};

// GET /productos/:id
const obtenerProducto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      `SELECT p.*, c.nombre AS categoria
       FROM productos p
       LEFT JOIN categorias c ON p.categoria_id = c.id
       WHERE p.id = $1`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ ok: false, mensaje: 'Producto no encontrado' });
    }
    const datos=transformarProducto(rows[0])

    res.json({ ok: true, datos});
  } catch (err) {
    next(err);
  }
};

// POST /productos
const crearProducto = async (req, res, next) => {
  try {
    const { nombre, descripcion, precio, stock, categoria_id, imagen_url } = req.body;

    if (!nombre || precio === undefined) {
      return res.status(400).json({ ok: false, mensaje: 'nombre y precio son requeridos' });
    }

    const { rows } = await pool.query(
      `INSERT INTO productos (nombre, descripcion, precio, stock, categoria_id, imagen_url)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [nombre, descripcion, precio, stock ?? 0, categoria_id ?? null, imagen_url ?? null]
    );

    const datos=transformarProducto(rows[0]);
    res.status(201).json({ ok: true, mensaje: 'Producto creado', datos});
  } catch (err) {
    next(err);
  }
};

// PUT /productos/:id
const editarProducto = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, categoria_id, imagen_url, activo } = req.body;

    const { rows: existe } = await pool.query(
      'SELECT id FROM productos WHERE id = $1', [id]
    );
    if (existe.length === 0) {
      return res.status(404).json({ ok: false, mensaje: 'Producto no encontrado' });
    }

    const { rows } = await pool.query(
      `UPDATE productos SET
        nombre       = COALESCE($1, nombre),
        descripcion  = COALESCE($2, descripcion),
        precio       = COALESCE($3, precio),
        stock        = COALESCE($4, stock),
        categoria_id = COALESCE($5, categoria_id),
        imagen_url   = COALESCE($6, imagen_url),
        activo       = COALESCE($7, activo)
       WHERE id = $8
       RETURNING *`,
      [nombre, descripcion, precio, stock, categoria_id, imagen_url, activo, id]
    );
    const datos=transformarProducto(rows[0]);

    res.json({ ok: true, mensaje: 'Producto actualizado', datos});
  } catch (err) {
    next(err);
  }
};

// DELETE /productos/:id
const eliminarProducto = async (req, res, next) => {
  try {
    const { id } = req.params;

    const { rows } = await pool.query(
      'UPDATE productos SET activo = false WHERE id = $1 RETURNING *', [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ ok: false, mensaje: 'Producto no encontrado' });
    }
    const datos=transformarProducto(rows[0]);
    res.json({ ok: true, mensaje: 'Producto eliminado (soft delete)', datos});
  } catch (err) {
    next(err);
  }
};

module.exports = {
  listarProductos,
  obtenerProducto,
  crearProducto,
  editarProducto,
  eliminarProducto,
}