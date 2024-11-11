const mysql = require('mysql2');

const db = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "22510115",
    database: "tudolist"
});

// open the MySQL connection
db.connect(error => {
    if (error) throw error;
    console.log("DB connected");
});

module.exports = db;