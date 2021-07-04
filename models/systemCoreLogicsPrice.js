var multiple_db = require('../config/multiple_mysql.js');


const exp = {


    countPrice:() => {
      multiple_db.query('SELECT * FROM Users WHERE email_confirmed = ? AND points != ? AND pointsStatus != ? AND verified = ? AND role = ?;', [1,0,0,1,1], function (error, results, fields) {

        let n = results.length;

        console.log(n);

        if(n > 0){

            }


          });
    }
    //





}

module.exports = exp;
