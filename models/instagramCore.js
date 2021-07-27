const axios = require('axios');
var multiple_db = require('../config/multiple_mysql.js');
const fs = require('fs');
let notificationBox = require('../models/notificationBox.js');
let notificationBoxCentralMessages = require('../models/notificationBoxCentralMessages.js');
let systemCoreLogicsFinalCount = require('../models/systemCoreLogicsFinalCount.js');
let helpers = require("../models/helpers.js");
//const token = "EAADZCHZCQRjJ4BAI284ZCGX7MUGH1bQmTDEJka7ifzl5eJYkwTNaXzrT1CuWi5HsTYuZC4wcFOIZApxH5z2ZAtVbXhDixC8y17fRUttP5kZBuTfSiJplvraWClgfgW0QZCuDI8hADfxZBpCEqQ8jxbRflWLIt4lPsuBS5VjN3h5Q9COn47W1gAnXIlIfCaijB6hlEhfl4KKZC2szxjgpZCkKyZBhWns4RIU9X9kZD";

// pages_show_list
// instagram_basic
 //so you eventually will have to introduce logic that can determine the correct Page ID to capture (or devise a UI where your app users can identify the correct Page


 // A Facebook User access token with the following permissions:
 //
 // instagram_basic
 // instagram_manage_insights
 // pages_read_engagement or pages_show_list


 // If the token is from a User whose Page role was granted via the Business Manager, one of the following permissions is also required:
 //
 // pages_show_list
 // instagram_basic
 // instagram_manage_insights
 // pages_read_engagement




const instaCore = {

     getAccountTokenFromDb:(email) => {
       return new Promise(resolve => {

         multiple_db.query('SELECT facebookAccessToken FROM `Users` WHERE email = ? LIMIT 1',[email], function (error, results, fields){


             resolve(results[0].facebookAccessToken);

         });

       })
     },

     getAccounts:function(token){//2 step after authorization get user main page id

       return new Promise(resolve => {
         axios.get("https://graph.facebook.com/v11.0/me/accounts?access_token=" + token)
          .then(function (response) {
            // handle success

            //response.data.data
            //response.data.paging
            //instaCore.keepRecord("instagramCoreGetAccounts.txt",response.data);
            instaCore.keepRecord("instagramCoreGetAccounts.json",{response:response.data});
            let id = response.data.data[0].id;//100882208840250
            resolve(id);
          })
          .catch(function (error) {
            // handle error
            resolve(false);
          })
          .then(function () {
            // always executed
          });
       })




      },
      getInstagramBusinessAccountId:(userpageid,token) => {//3 get instagram business page id

        return new Promise(resolve => {
          axios.get("https://graph.facebook.com/v11.0/" + userpageid + "?fields=instagram_business_account&access_token=" + token)
           .then(function (response) {
             let business_page = response.data.instagram_business_account.id;//17841401349212053
             instaCore.keepRecord("getInstagramBusinessAccountId.json",{response:response.data});
             resolve(business_page);
           })
           .catch(function (error) {
             // handle error
             resolve(false);
           })
           .then(function () {
             // always executed
           });
        })

      },

      getInstagramFollowersAndMediaCount:(businessPageId,token) => {//3 get instagram business page id

        let url = "https://graph.facebook.com/v3.2/" + businessPageId + "?fields=biography,username,website,followers_count,follows_count,media_count,name,profile_picture_url&&access_token=" + token;

        return new Promise(resolve => {
          axios.get(url)
           .then(function (response) {
             let result = response.data;//17841401349212053
             instaCore.keepRecord("getInstagramFollowersAndMediaCount.json",{response:response.data});
             resolve(result);
           })
           .catch(function (error) {
             // handle error
             //resolve(error);
           })
           .then(function () {
             // always executed
           });
        })

      },

      saveDataInDb:(object,email) => {
          return new Promise(resolve => {

            const updateData = [object.profile_picture_url,object.biography,object.name,object.username,object.website,object.followers_count,object.media_count,object.id,email];
            // {
            //   biography: 'Came to change world- startup from silicon valley',
            //   username: 'echohub_io_founder_and_cto',
            //   website: 'https://echohub.io/',
            //   followers_count: 1321,
            //   follows_count: 7223,
            //   media_count: 133,
            //   name: 'Dulat',
            //   profile_picture_url: 'https://scontent-sjc3-1.xx.fbcdn.net/v/t51.2885-15/127339980_2667700863541741_8443415149720095446_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=86c713&_nc_ohc=N7rUmncsjT0AX9QV9q4&_nc_ht=scontent-sjc3-1.xx&oh=644490dc23803f15bb01da704ae4d358&oe=60F5CD9E',
            //   id: '17841401349212053'
            // }

            multiple_db.query('UPDATE Users SET image_url = ?,bio = ?,firstName = ?,name = ?,website = ?,subscribers_count = ?,media_count = ?,instagramBusinessId = ? WHERE email = ?',updateData, function (error, results, fields) {

              resolve(true);

            });
          })
      },

      checkInstagramAccount:(email) => {
          const Stepper = async(email) => {
            const getUserToken = await instaCore.getAccountTokenFromDb(email);
            const getAccountId = await instaCore.getAccounts(getUserToken);//100882208840250
            const getInstagramBusinessAccountId = await instaCore.getInstagramBusinessAccountId(getAccountId,getUserToken);//17841401349212053
            const getInstagramFollowersAndMediaCount = await instaCore.getInstagramFollowersAndMediaCount(getInstagramBusinessAccountId,getUserToken);
            const saveDataInDb = await instaCore.saveDataInDb(getInstagramFollowersAndMediaCount,email);
            return saveDataInDb;
          }

          Stepper(email).then(res => {

            console.log(res)

            //instagramCore.checkInstagramAccount("2clickorg@gmail.com");

          });
      },

      checkInstagramSubscribers:(email) => {
        return new Promise(resolve => {
          multiple_db.query('SELECT instagramBusinessId FROM `Users` WHERE `email` = ?', [email], function (error, results, fields) {

            if(results.length > 0){

                let instagramBusinessId = results[0].instagramBusinessId;
                  if(instagramBusinessId != 0){
                    resolve(true);
                  }else{
                    resolve(false);
                  }

                }


              });
        })
      },

      keepRecord:(fileName,content) => {
        fs.writeFile('./models/instagramCoreLogs/' + fileName, JSON.stringify(content),{ flag: 'w+' }, err => {
          if (err) {
            console.error(err)
            return
          }
          //file written successfully
          })
      },

      readRecord:((fileName) => {
        const fs = require('fs')

          fs.readFile('./models/instagramCoreLogs/' + fileName, 'utf8' , (err, data) => {
            if (err) {
              console.error(err)
              return
            }

            let found = data.indexOf("ix6czkEiP36JfWnLFhMomQ");

            console.log(data.indexOf("ix6czkEiP36JfWnLFhMomQ"))
            //https://echohub.io/follow/ix6czkEiP36JfWnLFhMomQ

            if(found >= 0){
              console.log(found)
            }else{
              console.log("link not found")
            }





          })
      }),

      trackVideo:(url) => {

        //instaCore.keepRecord("track.json",{response:response.data});
        //instaCore.readRecord("track.json");

        return new Promise(resolve => {
            axios.get(url)
            .then(function (response) {

              if(response.status === 200){
                resolve(true);
              }else{
                resolve(false);
              }

            })
            .catch(function (error) {
              // handle error

            })
            .then(function () {
              // always executed
            });
        });

      },
      trackVideoByResponse_200_and_projectId:(project_id,user_email) => {

        //instaCore.keepRecord("track.json",{response:response.data});
        //instaCore.readRecord("track.json");

        const checkVideosByProjectId = (project_id,user_email) => {
          return new Promise(resolve => {
            multiple_db.query('SELECT url FROM usersvideo WHERE project_id = ? AND user_email = ? LIMIT 1', [project_id, user_email], function (error, results, fields) {

                if(results.length > 0){
                  resolve(results[0].url);
                }

                });
          });
        }

        const checkUrl = (url) => {
          return new Promise(resolve => {
              axios.get(url)
              .then(function (response) {

                if(response.status === 200){
                  resolve(true);
                }else{
                  resolve(false);
                }

              })
              .catch(function (error) {
                // handle error
                resolve(false);
              })
              .then(function () {
                // always executed
                resolve(false);
              });
          });
        }

        const Stepper = async() => {
          const stepOne = await checkVideosByProjectId(project_id,user_email);
          const stepTwo = await checkUrl(stepOne);
          return stepTwo;
        }

        return Stepper();



      },

      countDays:() => {
        //verifiedDays
        //count_of_video
        multiple_db.query('SELECT * FROM `uniquenames` WHERE `status` = ? AND `open_for_verification` != ?;SELECT count_of_video FROM `appParams`;', [4,3], function (error, results, fields) {

          if(results.length > 0){
                let limit = results[1][0].count_of_video;

                let countUsers = results[0];
                for(let i = 0;i < countUsers.length;i++){
                  let current_day = countUsers[i].verifiedDays;
                  let currentEmail = countUsers[i].user_email;
                  let id = countUsers[i].id;
                  let project_id = countUsers[i].project_id;
                  let open_for_verification = countUsers[i].open_for_verification;

                  //increment days
                  current_day++;
                  if(current_day <= limit){

                      const updateDayAndOpenTask = (status,current_day,id) => {

                        multiple_db.query('UPDATE uniquenames SET open_for_verification = ?,verifiedDays = ? WHERE id = ?', [status,current_day,id], function (error, results, fields) {
                        });

                      }

                      if(current_day === 1){


                        const checkVideo = instaCore.trackVideoByResponse_200_and_projectId(project_id,currentEmail).then(res => {
                          if(res === true){
                            updateDayAndOpenTask(1,current_day,id);//confirmed
                            notificationBoxCentralMessages.notifyBusinessAndCreator(current_day,project_id,currentEmail,limit);
                            //notificationBox.sendHyperSingle("new message from " + data.email,"<a href='echohub.io'>" + message + "</a>",message,data.sendemail);
                          }else{
                            updateDayAndOpenTask(3,current_day,id);//confirmed
                          }
                        });


                      }else if(current_day === 3){
                        const checkVideo = instaCore.trackVideoByResponse_200_and_projectId(project_id,currentEmail).then(res => {
                          if(res === true){
                            updateDayAndOpenTask(1,current_day,id);//confirmed
                            notificationBoxCentralMessages.notifyBusinessAndCreator(current_day,project_id,currentEmail,limit);
                          }else{
                            updateDayAndOpenTask(3,current_day,id);//confirmed
                          }
                        });
                      }else if(current_day === 7){
                        const checkVideo = instaCore.trackVideoByResponse_200_and_projectId(project_id,currentEmail).then(res => {
                          if(res === true){
                            updateDayAndOpenTask(1,current_day,id);//confirmed
                            notificationBoxCentralMessages.notifyBusinessAndCreator(current_day,project_id,currentEmail,limit);
                            systemCoreLogicsFinalCount.finalCount(project_id,currentEmail);
                            helpers.closeCreatorTask(project_id,currentEmail);
                          }else{
                            updateDayAndOpenTask(3,current_day,id);//confirmed
                          }
                        });
                      }else{
                        multiple_db.query('UPDATE uniquenames SET verifiedDays = ? WHERE id = ?', [current_day,id], function (error, results, fields) {

                        });
                      }
                  }

                }


              }


            });
      }





}

module.exports = instaCore;
