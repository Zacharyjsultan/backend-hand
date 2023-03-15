const pool = require('../utils/pool');

class Cat {
  id;
  name;
  breed;
  age;
  constructor({ id, name, breed, age }) {
    this.id = id;
    this.name = name;
    this.breed = breed;
    this.age = age;
  }
  static async delete(id) {
    const { rows } = await pool.query(
      `
    DELETE FROM cats
    WHERE id = $1
    RETURNING *
    `,
      [id]
    );
    return new Cat(rows[0]);
  }

  static async post({ name, breed, age }) {
    const { rows } = await pool.query(
      `
insert into cats (name, breed, age)
values ($1, $2, $3)
returning *
`,
      [name, breed, age]
    );
    return new Cat(rows[0]);
  }

  static async getCatByID(id) {
    const { rows } = await pool.query(
      `
    SELECT * FROM cats
    WHERE id = $1
    `,
      [id]
    );
    return new Cat(rows[0]);
  }

  static async count() {
    const { rows } = await pool.query('SELECT COUNT(*) from cats');
    return Number(rows[0].count);
  }

  static async getCats() {
    const { rows } = await pool.query('SELECT * FROM cats');
    return rows.map((row) => new Cat(row));
  }
  static async updateCat(id, newAttr) {
    const cat = await Cat.getCatByID(id);
    if (!cat) return null;
    const updateData = { ...cat, ...newAttr };
    const { rows } = await pool.query(
      `UPDATE cats
      SET name = $2, breed = $3, age = $4
      WHERE id = $1
      RETURNING *
      `,
      [id, updateData.name, updateData.breed, updateData.age]
    );
    return new Cat(rows[0]);
  }
}

module.exports = { Cat };
