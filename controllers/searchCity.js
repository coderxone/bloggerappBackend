var multiple_cityDb = require('../config/multiple_cityDb');
var multiple_db = require('../config/multiple_mysql');
var formHelper = require("../models/formHelpers.js");

module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('searchCity', function (data) {

                   socket.join(data.deviceid);
                   var searchstring = formHelper.cleanString(data.search);

                   multiple_cityDb.query("SELECT Name FROM `city` WHERE `Name` LIKE '%" + searchstring + "%' ORDER BY ID desc LIMIT 3", function (error, results, fields) {
                     if (error) throw error;
                      // connected!
                      //console.log(results);
                      // {Name: "New Bedford"}
                      // 1: {Name: "New Haven"}
                      // 2: {Name: "New Orleans"}
                      // 3: {Name: "New York"}
                      // 4: {Name: "New Delhi"}

                      multiple_db.query("SELECT fromPoint FROM `UsersData` WHERE `fromPoint` LIKE '%" + searchstring + "%' ORDER BY ID desc LIMIT 3", function (error, resultstwo, fields) {
                        if (error) throw error;
                         // connected!
                         //console.log(resultstwo);


                         if(resultstwo){
                           if(resultstwo.length > 0){

                              var filteredArray = new Array();

                              for(var i = 0;i < resultstwo.length;i++){
                                  var city = resultstwo[i].fromPoint;

                                  if(filteredArray.length > 0){
                                    var fixfind = 0;
                                    for(var j = 0;j < filteredArray.length;j++){
                                      if(filteredArray[j].Name == city){
                                        fixfind = 1;
                                      }
                                    }

                                    if(fixfind == 0){

                                      var object = {
                                        "Name":city
                                      }

                                      filteredArray.push(object);
                                    }
                                  }else{
                                    var obj = {
                                      "Name":city
                                    }

                                    filteredArray.push(obj);
                                  }

                              }

                              if(filteredArray.length > 0){
                                for(var k = 0;k < filteredArray.length;k++){
                                  //console.log(filteredArray[k]);
                                    results.push(filteredArray[k]);
                                }

                              }



                           }
                         }


                         io.sockets.in(data.deviceid).emit('searchCity', {data: results});

                        //  fromPoint: 'Los Angeles' } ]
                        // [ RowDataPacket { fromPoint: 'New York' } ]
                        // [ RowDataPacket { fromPoint: 'New York' } ]
                        // [ RowDataPacket { fromPoint: 'New York' } ]
                        // [ RowDataPacket { fromPoint: 'New York' } ]
                        // [ RowDataPacket { fromPoint: 'New York' }

                      });




                   });



              });



        });


};
