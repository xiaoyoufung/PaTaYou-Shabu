const BaseSQLModel = require("./baseSQLModel");

class FoodsModel extends BaseSQLModel{
    constructor(){
        super("food"); // table 'Food'
    }
}

const FoodsDB = new FoodsModel();

module.exports = FoodsDB;