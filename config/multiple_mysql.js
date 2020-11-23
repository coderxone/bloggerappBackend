var mysql = require('mysql');
var connection = mysql.createConnection({
  multipleStatements: true,
   host     : 'localhost',
  //host     : '3.136.1.134',
  user     : 'root',
  password : 'hack7777',
  // password : 'googlehack',
  database : 'neiron'
});

module.exports = connection;

//ostanovilsya na insert
