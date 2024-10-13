const pool = require('../config/db'); 

class BaseSQLModel {
  constructor(tableName) {
    this.tableName = tableName;
  }

  executeQuery(query, params) {
    return new Promise((resolve, reject) => {
      pool.query(query, params, (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  async findAll() {
    const query = `SELECT * FROM ${this.tableName}`;
    const results = await this.executeQuery(query);
    return results;
  }

  async findByColumn(column) {
    const query = `SELECT ${column} FROM ${this.tableName}`;
    const results = await this.executeQuery(query);
    return results;
  }

  async findById(id) {
    const query = `SELECT * FROM ${this.tableName} WHERE id = ?`;
    const results = await this.executeQuery(query, [id]);
    return results[0];
  }

  async findByCategoryId(id) {
    const query = `SELECT * FROM ${this.tableName} WHERE category_id = ?`;
    const results = await this.executeQuery(query, [id]);
    return results[0];
  }

  async findByProductId(id) {
    const query = `SELECT * FROM ${this.tableName} WHERE product_id = ?`;
    const results = await this.executeQuery(query, [id]);
    return results[0];
  }

  async findByKey(key, value) {
    const query = `SELECT * FROM ${this.tableName} WHERE ${key} = ?`;
    const results = await this.executeQuery(query, [value]);
    return results;
  }

  async findAllByKey(key, value) {
    const query = `SELECT * FROM ${this.tableName} WHERE ${key} = ?`;
    const results = await this.executeQuery(query, [value]);
    return results;
  }

  async create(data) {
    const query = `INSERT INTO ${this.tableName} SET ?`;
    const result = await this.executeQuery(query, data);
    return result.insertId;
  }

  async update(id, data) {
    const query = `UPDATE ${this.tableName} SET ? WHERE id = ?`;
    const result = await this.executeQuery(query, [data, id]);
    return result.affectedRows;
  }

  async updateProduct(id, data) {
    const query = `UPDATE ${this.tableName} SET ? WHERE product_id = ?`;
    const result = await this.executeQuery(query, [data, id]);
    return result.affectedRows;
  }

  async delete(id) {
    const query = `DELETE FROM ${this.tableName} WHERE id = ?`;
    const result = await this.executeQuery(query, [id]);
    return result.affectedRows;
  }

  async deleteByKey(key, value) {
    const query = `DELETE FROM ${this.tableName} WHERE ${key} = ?`;
    const results = await this.executeQuery(query, [value]);
    return results;
  }

  // find Bill
  async findByBillId(id) {
    const query = `SELECT * FROM ${this.tableName} WHERE bill_id = ? ORDER BY bill_date DESC`;
    const results = await this.executeQuery(query, [id]);
    return results[0];
  }

  async findByBillsId(column) {
    const query = `SELECT * FROM ${this.tableName} WHERE bill_id = ${column}`;
    const results = await this.executeQuery(query);
    return results;
  }

  // sort by
  async sortByBillDate() {
    const query = `SELECT * FROM ${this.tableName} ORDER BY bill_date DESC`;
    const results = await this.executeQuery(query);
    return results;
  }

  async sortByIncome() {
    const query = `SELECT * FROM ${this.tableName} ORDER BY total_income DESC`;
    const results = await this.executeQuery(query);
    return results;
  }

  async findByOrderdetail(){
    const query =  `SELECT o.OrderID, o.CustomerID, c.customer_name, o.FoodID, f.food_name, f.food_price, o.order_quantity FROM orderdetail o JOIN customer c ON o.CustomerID = c.CustomerID JOIN food f ON o.FoodID = f.FoodID ORDER BY o.OrderID`;
    const results = await this.executeQuery(query);
    return results;
  }

  async createMultipleOrders(orders) {
    if (!Array.isArray(orders) || orders.length === 0) {
      throw new Error('Input must be a non-empty array of order objects');
    }
  
    const columns = ['OrderID', 'CustomerID', 'FoodID', 'order_quantity'];
    const placeholders = orders.map(() => `(?, ?, ?, ?)`).join(',');
    
    const query = `INSERT INTO ${this.tableName} (${columns.join(',')}) VALUES ${placeholders}`;
    
    const values = orders.flatMap(order => [
      order.OrderID,
      order.CustomerID,
      order.FoodID,
      order.order_quantity
    ]);
  
    const result = await this.executeQuery(query, values);
    return result.insertId;
  }

}




module.exports = BaseSQLModel;