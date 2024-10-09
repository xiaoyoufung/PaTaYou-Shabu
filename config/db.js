const mysql = require("mysql2");

let config =  { host: "127.0.0.1",
user: "root",
password: "",
database: "patayou"    
};


const connection = mysql.createConnection(config);

connection.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Database is connected");
});

module.exports = connection;