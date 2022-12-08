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
}

module.exports = { Cat };
