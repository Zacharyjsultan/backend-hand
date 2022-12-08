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

  static async getDogsById(id) {
    const { rows } = await pool.query('SELECT * FROM dogs WHERE id = $1', [id]);
    return new Dogs(rows[0]);
  }

  static async getDogs() {
    const { rows } = await pool.query('SELECT * FROM dogs');
    return rows.map((row) => new Dogs(row));
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
  static async updateDogs(id, newAttr) {
    const dog = await this.getDogsById(id);
    if (!dog) return null;
    const updateData = { ...dog, ...newAttr };
    const { rows } = await pool.query(
      `UPDATE dogs
        SET name = $2, breed = $3
        WHERE id = $1
        RETURNING *
        `,
      [id, updateData.name, updateData.breed]
    );
    return new Dogs(rows[0]);
  }
}

module.exports = { Dogs };
