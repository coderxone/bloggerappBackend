const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'test',
	password:'test',
  database: 'mydb'
});

module.exports = connection;
