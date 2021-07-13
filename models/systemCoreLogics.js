var multiple_db = require('../config/multiple_mysql.js');

//separate task
//followersViews
const checkPointFromViews = (array,userpoint) => {

    if(userpoint.status === true){
      for(let i = 0;i < array.length;i++){
        let minRange = array[i].min;
        let maxRange = array[i].max;

        let count = userpoint.count;

        if(count >= minRange && count <= maxRange){
          let point = array[i].point;
          return parseInt(point);
          break;
        }
      }
    }else{
      return false;
    }


}

//  let fv_point = checkPointFromViews(followersCountData,subscribersCount);
//we will run it when status of task will ready to cash out
//last result we will add to total point
//separate task

//followersCount
const check_F_C_PointValue = (array,userpoint) => {
    for(let i = 0;i < array.length;i++){
      let minRange = array[i].min;
      let maxRange = array[i].max;

      if(userpoint >= minRange && userpoint <= maxRange){
        let point = array[i].point;
        return parseInt(point);
        break;
      }
    }

    return 0;
}


const getCountryValue = (array,userCountryCode) => {
  ////
  for(let i = 0;i < array.length;i++){
    let currentValue = array[i].country_code;
    if(currentValue == userCountryCode){
      return array[i].price;
      break;
    }

  }
}

const checkPointAgeMetrix = (array,age) => {
    for(let i = 0;i < array.length;i++){
      let minRange = array[i].min;
      let maxRange = array[i].max;

      if(age >= minRange && age <= maxRange){
        let point = array[i].point;
        return parseInt(point);
        break;
      }
    }

    return 0;
}
const exp = {



     checkCoreFunction:function(email){
       // io.sockets.in(data.deviceid).emit('subscriberCore', cryptLibrary.encrypt({subscribersResult:readableData,originalNumber:countOfSubscribers,countOfBloggers:ThirstCount,NewCheckingAmount:NewCheckingAmount}));
       //accountAge

       return new Promise((resolve) => {
         multiple_db.query('SELECT * FROM followersCount;SELECT * FROM Users WHERE email = ? AND points = ? AND pointsStatus = ? AND role = ? LIMIT 1;SELECT * FROM countryPrices;SELECT * FROM accountAgePoints;', [email,0,0,1], function (error, results, fields) {

           //0 id followersCount
           let followersCountData = results[0];
           //checkPointValue(followersCountData,usersubscribercount);
           //1 followersViews
           //checkPointFromViews(followersCountData,usersubscribercount);
           //2 users
           let userData = results[1][0];
           let n = results[1];

           if(n.length > 0){
             userData = results[1][0];
             let subscribersCount = userData.subscribers_count;
             let accountAge = userData.accountAge;
             let userCountry = userData.country;
             //3 countryPrices
             let countryPriceData = results[2];
             //accountAgePoints
             let pointMetrix = results[3];

             //1 first we will get followersCount range
             let fc_point = check_F_C_PointValue(followersCountData,subscribersCount);

             //3 we should get age point from age metrix
             let ageMetric = checkPointAgeMetrix(pointMetrix,accountAge);
             //4 we should get country value from country metrix
             let countryMetrix = getCountryValue(countryPriceData,userCountry);

             //5 let write core algorithm

             let coreResult = (fc_point + ageMetric) * countryMetrix;

             console.log(fc_point,ageMetric,countryMetrix);

             exp.updateSinglePointsInDb(coreResult,email).then(res => {
               resolve(res);
             })

           }else{
             resolve({
               status:false,
               statusCode:"don't have user to count point"
             });
           }



         });
       })


       // systemCoreLogics.checkCoreFunction("hhh@gmail.com").then(result => {
       //   console.log(result);
       // });
    },

    updateSinglePointsInDb:(points,email) => {

        return new Promise((resolve) => {

            multiple_db.query('UPDATE Users SET points = ?, pointsStatus = ? WHERE email = ?', [points,1,email], function (error, results, fields) {
              resolve({
                status:true,
                points:points,
                statusCode:"ok"
              });
            });

        })


    },





    checkViews:(project_id) => {

      return new Promise((resolve) => {

        multiple_db.query('SELECT uniquenames.hash FROM `uniquenames` WHERE `project_id` = ?;', [project_id], function (error, results, fields) {

           if(results.length > 0){
                 var hash = results[0].hash;

                 multiple_db.query('SELECT * FROM `views` WHERE `hash` = ?', [hash], function (error, results, fields) {


                       resolve({status:true,count:results.length});


                     });
            }else{
              resolve({status:false});
            }

            });
      })


    }







}

module.exports = exp;


// const test = () => {
//     // systemCoreLogics.checkCoreFunction("hhh@gmail.com").then(result => {
//     //   //console.log(result);
//     // });
//
//     // systemCoreLogicsAll.checkCoreFunctionAll().then(result => {  //check all database and record check once a day
//     //   console.log(result);
//     // });
//
//     //systemCoreLogicsFinalCount.finalCount(94,"hhh@gmail.com");//project_id,email //check with final step
//
//
//
// }
