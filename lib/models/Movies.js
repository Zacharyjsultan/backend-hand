const pool = require('../utils/pool');

class Movies {
  id;
  title;
  year;
  rating;
  constructor({ id, title, year, rating }) {
    this.id = id;
    this.title = title;
    this.year = year;
    this.rating = rating;
  }
  static async post({ title, year, rating }) {
    const { rows } = await pool.query(
      `
      INSERT INTO movies (title, year, rating)
      VALUES ($1, $2, $3)
      RETURNING *`,
      [title, year, rating]
    );
    return new Movies(rows[0]);
  }
  static async count() {
    const { rows } = await pool.query('SELECT COUNT(*) FROM movies');
    return Number(rows[0].count);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM movies');
    return rows.map((row) => new Movies(row));
  }
}
module.exports = { Movies };
