var multiple_db = require('../config/multiple_mysql.js');


const exp = {


    countPrice:() => {

      return new Promise(resolve => {
        multiple_db.query('SELECT * FROM Users WHERE email_confirmed = ? AND points != ? AND pointsStatus != ? AND verified = ? AND role = ?;', [1,0,0,1,1], function (error, results, fields) {

          let n = results.length;
          let resultPrice = 0;



            if(n > 0){

                for(let i = 0;i < n;i++){
                  resultPrice += results[i].points;
                }

                resolve(resultPrice);

              }


            });
      })

    }
    //





}

module.exports = exp;
