var mysql = require('mysql');
var connection = mysql.createConnection({
  multipleStatements: true,
  host     : 'localhost',
  user     : 'root',
  password : 'googlehack',
  //password : 'hack7777',
  database : 'world'
});

module.exports = connection;

//ostanovilsya na insert
