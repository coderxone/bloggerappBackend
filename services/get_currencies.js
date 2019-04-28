var request = require('request');
var parseString = require('xml2js').parseString;
var db_multiple = require('../config/multiple_mysql.js');

module.exports = {

     get_russian_currencies:function(){


       request.get({url:'http://www.cbr.ru/scripts/XML_daily.asp'}, function(err,httpResponse,body){

               parseString(body, function (err, result) {
                    //console.log(result.ValCurs.$.Date);
                    //console.log(result.ValCurs.$.name);

                    try{


                    var ru_kzt = 0;

                    for(var i = 0;i < result.ValCurs.Valute.length;i++){

                        if(result.ValCurs.Valute[i].CharCode == "KZT"){


                          var b = Number(result.ValCurs.Valute[i].Nominal[0]);
                          var c = parseInt(result.ValCurs.Valute[i].Value[0]);
                          var update_unix_time = new Date().getTime();

                          ru_kzt = b / c;

                          ru_kzt = ru_kzt.toFixed(2);
                          //console.log(ru_kzt);

                          db_multiple.query('UPDATE currency SET ru_kzt_russia = ?,unix_time = ? WHERE id = ?', [ru_kzt,update_unix_time,1], function (error, results, fields) {

                            if(results.changedRows == 1){
                              //update_record = 1;
                            }


                          });

                        }

                    }

                  }catch(message){

                  }
                    //console.log(ru_kzt);



                });

              })

        return "1";

    },


    get_kazakhstan_currencies:function(){

        //https://nationalbank.kz/rss/rates_all.xml
        return "2";

    }




}
