const pool = require('../db/pool');

const categorias = async (req, res, next) => {
  try {
    const query = `
      SELECT 
        c.id AS categoria_id,
        c.nombre
      FROM categorias c
      ORDER BY c.id ASC
    `;

    const result = await pool.query(query);

    res.json({
      ok: true,
      total: result.rowCount,
      categorias: result.rows
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  categorias
};