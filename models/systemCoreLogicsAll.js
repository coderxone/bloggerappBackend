var multiple_db = require('../config/multiple_mysql.js');

//separate task
//followersViews

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



    saveMultiEmailArray:(res) => {

        return new Promise((resolve) => {

            if(res.status === true){
              let list = res.array;
              const saveItem = async (item) => {
                return new Promise((resolve) => {
                  multiple_db.query('UPDATE Users SET points = ?,pointsStatus = ? WHERE email = ? AND points = ? AND pointsStatus = ?', [item.point,1,item.email,0,0], function (error, results, fields) {

                      resolve(item);

                  });
                })
              }

              const saveMultiArray = async () => {
                return await Promise.all(list.map((item) => {
                  return saveItem(item);
                }));
              }

              let result = 0;
              saveMultiArray().then(res => {
                resolve({
                  status:true,
                  result:res
                })
              });



            }else{
              resolve({
                status:false,
                result:res,
                statusCode:res.statusCode
              });
            }

        });



    },

    checkCoreFunctionAll:() => {
      // io.sockets.in(data.deviceid).emit('subscriberCore', cryptLibrary.encrypt({subscribersResult:readableData,originalNumber:countOfSubscribers,countOfBloggers:ThirstCount,NewCheckingAmount:NewCheckingAmount}));
      //accountAge

      return new Promise((resolve) => {
        multiple_db.query('SELECT * FROM followersCount;SELECT * FROM Users WHERE email_confirmed = ? AND points = ? AND pointsStatus = ? AND verified = ? AND role = ?;SELECT * FROM countryPrices;SELECT * FROM accountAgePoints;', [1,0,0,1,1], function (error, results, fields) {

          //0 id followersCount
          let followersCountData = results[0];
          let userData = results[1];
          let n = userData.length;
          let countryPriceData = results[2];
          let pointMetrix = results[3];

          let resultMatrix = [];

          if(n > 0){

              for(let i = 0;i < n;i++){
                let subscribersCount = userData[i].subscribers_count;
                let accountAge = userData[i].accountAge;
                let userCountry = userData[i].country;
                let email = userData[i].email;

                let fc_point = check_F_C_PointValue(followersCountData,subscribersCount);
                let ageMetric = checkPointAgeMetrix(pointMetrix,accountAge);
                let countryMetrix = getCountryValue(countryPriceData,userCountry);

                console.log(fc_point,ageMetric,countryMetrix);

                let coreResult = (fc_point + ageMetric) * countryMetrix;

                resultMatrix.push({
                  point:coreResult,
                  email:email
                });

              }

              // console.log(resultMatrix);
              // return false;
//xx
              exp.saveMultiEmailArray({
                status:true,
                array:resultMatrix
              }).then((res) => {
                resolve(res);
              })



          }else{
            resolve({
              status:false,
              statusCode:"database don't have new records to analyse points"
            });
          }

        });
      })


      // systemCoreLogics.checkCoreFunction("hhh@gmail.com").then(result => {
      //   console.log(result);
      // });
   },









}

module.exports = exp;
