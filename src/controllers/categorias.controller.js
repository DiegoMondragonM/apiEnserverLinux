const pool = require('../db/pool');

const categorias = async (req, res, next) => {
  try {
    const { categoria_id, nombre } = req.query;

    let query = `
      SELECT 
        id AS categoria_id,
        nombre
      FROM categorias c
      ORDER BY id ASC
    `;

    // const params = [];
    // const conditions = [];

    // if (categoria_id) {
    //   params.push(categoria_id);
    //   conditions.push(`c.id = $${params.length}`);
    // }

    // if (nombre) {
    //   params.push(nombre);
    //   conditions.push(`c.nombre = $${params.length}`);
    // }

    // if (conditions.length > 0) {
    //   query += ` WHERE ` + conditions.join(' AND ');
    // }

    //query += ` ORDER BY c.id ASC`;

    const result = await pool.query(query, params);

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