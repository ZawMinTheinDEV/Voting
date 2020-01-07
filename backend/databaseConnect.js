const mysql = require("mysql");
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  passowrd: '',
  database: 'voting',
  port: '3306'
});
module.exports = con;
