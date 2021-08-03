const pool = require('../utils/pool');
module.exports = class Pizza {
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

    static async getById(id) {
      const { rows } = await pool.query(
        `SELECT * FROM pizzas
        WHERE id = $1`,
        [id]
      );
      return new Pizza(rows[0]);
    }

    static async getAll() {
      const { rows } = await pool.query(
        'SELECT * FROM pizzas'
      );

      return rows.map((row) => new Pizza(row));
    }

    static async updateById(id, { topping, crust, pieSize }) {
      const existingPizza = await Pizza.getById(id);
      const upTopping = topping ?? existingPizza.topping;
      const upCrust = crust ?? existingPizza.crust;
      const upPieSize = pieSize ?? existingPizza.pieSize;

      const { rows } = await pool.query(
        `UPDATE pizzas
        SET topping=$1, crust=$2, pie_size=$3
        WHERE id=$4
        RETURNING *`,
        [upTopping, upCrust, upPieSize, id]
      );
      return new Pizza(rows[0]);
  }
};



