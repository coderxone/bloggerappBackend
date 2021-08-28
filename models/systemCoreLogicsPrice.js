var multiple_db = require('../config/multiple_mysql.js');


const exp = {

    updateDataCentralPrice:() => {


      exp.countPrice().then(price => {
        multiple_db.query('UPDATE appParams SET postamount = ? WHERE id = ?', [price,1], function (error, results, fields) {

        });
      })


    },

    countPrice:() => {

      return new Promise(resolve => {
        multiple_db.query('SELECT * FROM Users WHERE email_confirmed = ? AND points != ? AND pointsStatus != ? AND verified = ? AND role = ?;SELECT * FROM appParams WHERE id = ?;', [1,0,0,1,1,1], function (error, results, fields) {

          let n = results[0].length;
          let first = results[0];
          let second = Math.floor(results[1][0].platform_percent);

          let resultPrice = 0;

            if(n > 0){

                for(let i = 0;i < n;i++){
                  resultPrice += first[i].points;
                }

                resultPrice += (Math.floor((resultPrice / 100) * second));

                resolve(resultPrice);

              }


            });
      })

    },
    test:() => {

      multiple_db.query("SELECT OrderDetails.Price, Orders.OrderId  FROM OrderDetails INNER JOIN Orders ON Orders.OrderId = OrderDetails.OrderId WHERE Orders.OrderDate = 'October 2017' AND (SELECT SUM(OrderDetails.Price) FROM OrderDetails INNER JOIN Orders ON Orders.OrderId = OrderDetails.OrderId WHERE Orders.OrderDate = 'October 2017') > '10000'", function (error, results, fields) {

        //(SELECT SUM(OrderDetails.Price) FROM OrderDetails INNER JOIN Orders ON Orders.OrderId = OrderDetails.OrderId WHERE Orders.OrderDate = 'October 2017')
        //(select SUM(purch_amt) FROM orders where ord_date ='10/10/2012')
        console.log(results)



          });

    }
    //





}

module.exports = exp;
