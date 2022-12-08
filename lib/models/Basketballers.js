const pool = require('../utils/pool');

class Basketballers {
  id;
  name;
  rating;
  strength;
  constructor({ id, name, rating, strength }) {
    this.id = id;
    this.name = name;
    this.rating = rating;
    this.strength = strength;
  }
  static async post({ name, rating, strength }) {
    const { rows } = await pool.query(
      `
    INSERT INTO basketballers (name, rating, strength)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
      [name, rating, strength]
    );
    return new Basketballers(rows[0]);
  }
  static async getById(id) {
    const { rows } = await pool.query(
      `
    SELECT * FROM basketballers
    WHERE id = $1
    `,
      [id]
    );
    return new Basketballers(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM basketballers');
    return rows.map((row) => new Basketballers(row));
  }

  static async count() {
    const { rows } = await pool.query('SELECT COUNT(*) from basketballers');
    return Number(rows[0].count);
  }
}

module.exports = { Basketballers };
