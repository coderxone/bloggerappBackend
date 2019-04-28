const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
	password:'googlehack',
  database: 'Rides'
});

module.exports = connection;
