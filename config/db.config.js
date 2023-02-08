const mysql = require('mysql2');
const dotenv=require('dotenv')

dotenv.config()
const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

db.connect(function (err) {
    if (err) throw err;
    console.log("Connected to the MySQL server");
});

module.exports = db;



