const pool = require('../utils/pool');

class Cities {
  id;
  name;
  skateparks;
  state;
  constructor({ id, name, skateparks, state }) {
    this.id = id;
    this.name = name;
    this.skateparks = skateparks;
    this.state = state;
  }

  static async update(id, newAttr) {
    const city = await Cities.getById(id);
    if (!city) return null;
    const updateData = { ...city, ...newAttr };
    const { rows } = await pool.query(
      `
    UPDATE cities
    SET name = $2, skateparks = $3, state = $4
    WHERE id = $1
    RETURNING *
    `,
      [id, updateData.name, updateData.skateparks, updateData.state]
    );
    return new Cities(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query('SELECT * FROM cities WHERE id = $1', [
      id,
    ]);
    return new Cities(rows[0]);
  }
  static async post({ name, skateparks, state }) {
    const { rows } = await pool.query(
      `
      INSERT INTO cities (name, skateparks, state)
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [name, skateparks, state]
    );
    return new Cities(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM cities');
    return rows.map((row) => new Cities(row));
  }
}
module.exports = { Cities };
