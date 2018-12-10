var mysql = require('mysql');
var connection = mysql.createConnection({
  multipleStatements: true,
  host     : 'localhost',
  user     : 'test',
  password : 'test',
  database : 'mydb'
});

module.exports = connection;
