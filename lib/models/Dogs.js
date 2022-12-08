const pool = require('../utils/pool');

class Dogs {
  id;
  name;
  breed;
  constructor({ id, name, breed }) {
    this.id = id;
    this.name = name;
    this.breed = breed;
  }

  static async dogCount() {
    const { rows } = await pool.query('SELECT COUNT(*) FROM dogs');
    return Number(rows[0].count);
  }

  static async insertDog({ name, breed }) {
    const { rows } = await pool.query(
      'INSERT INTO dogs (name, breed) VALUES ($1, $2) RETURNING *',
      [name, breed]
    );
    return new Dogs(rows[0]);
  }
}

module.exports = { Dogs };
