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



    //xx
    checkOccurrenceWithViewsMetrix:(viewsCount) => {
      return new Promise((resolve) => {
        multiple_db.query('SELECT * FROM followersViews;', function (error, results, fields) {

          if(viewsCount.status === true){
            let point = checkPointFromViews(results,viewsCount);

            if(point !== false){
              resolve({status:true,point:point});
            }else{
              resolve({status:false})
            }

          }else{
            resolve({status:false})
          }

        });
      })
    },
    //xx
    writePoints:(res,email) => {

      return new Promise((resolve) => {
        multiple_db.query('SELECT points,pointsStatus FROM Users WHERE email = ? LIMIT 1;',[email], function (error, results, fields) {

          if(res.status === true){

              let userPoints = results[0].points;
              let pointsStatus = results[0].pointsStatus;

              //adding last pointers
              let updatedPoints = userPoints + res.point

              //make sure we have permit to write
              if(pointsStatus === 1){
                multiple_db.query('UPDATE Users SET points = ?, pointsStatus = ? WHERE email = ?', [updatedPoints,2,email], function (error, results, fields) {
                  resolve({status:true});
                });
              }else{
                resolve({status:false,comments:"field already updated"});
              }



          }else{
                resolve({status:false,comments:"probalby user don't have views to update"});
          }

        });
      })


    },

    finalCount:(projectId,email) => {


        const stepF = async () => {

          const viewsCount = await exp.checkUserViews(projectId,email);
          const checkOccurrence = await exp.checkOccurrenceWithViewsMetrix(viewsCount);
          const writePointToDB = await exp.writePoints(checkOccurrence,email);

          return writePointToDB;
        }

        stepF().then(result => {
            //console.log(result);
        })

        //systemCoreLogics.finalCount(94,"hhh@gmail.com");//project_id,email


    },

    //xx
    checkUserViews:(project_id,email) => {

      return new Promise((resolve) => {

        multiple_db.query('SELECT uniquenames.hash FROM `uniquenames` WHERE `project_id` = ? AND `user_email` = ?;', [project_id,email], function (error, results, fields) {

           if(results.length > 0){
                 var hash = results[0].hash;

                 multiple_db.query('SELECT * FROM `views` WHERE `hash` = ?', [hash], function (error, results, fields) {

                       resolve({status:true,count:results.length});

                     });
            }{
              resolve({status:false});
              //temp
              //resolve({status:true,count:40});
            }

            });
      })


    },




}

module.exports = exp;
