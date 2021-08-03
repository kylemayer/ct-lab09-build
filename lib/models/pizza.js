const pool = require('./utils/pool');

class Pizza {
    id;
    topping;
    crust;
    pieSize;

    constructor(row) {
      this.id = row.id;
      this.topping = row.topping;
      this.crust = row.crust;
      this.pieSize = row.pie_size;
    }

    static async insert({ topping, crust, pieSize }) {
      const { rows } = await pool.query(
        `INSERT INTO pizzas (topping, crust, pie_size)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [topping, crust, pieSize]
      );
      return new Pizza(rows[0]);
    }
};

module.exports = {
  Pizza,
};

