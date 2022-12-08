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
