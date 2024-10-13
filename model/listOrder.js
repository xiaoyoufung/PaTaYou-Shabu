const BaseSQLModel = require("./baseSQLModel");

class OrdersModel extends BaseSQLModel{
    constructor(){
        super("orderdetail"); // table 'Food'
    }
}

const OrdersDB = new OrdersModel();

module.exports = OrdersDB;