const axios = require('axios');
var multiple_db = require('../config/multiple_mysql.js');
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




}

module.exports = instaCore;
