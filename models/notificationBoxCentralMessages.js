
let notificationBox = require('../models/notificationBox.js');
var multiple_db = require('../config/multiple_mysql.js');
var NotificationEmailTemplate = require('../models/emailTemplatesModels/NotificationEmailTemplate.js');

const exp = {

      //sending message from added video from creator
     sendHyperSingleByProjectId:function(project_id,email){
        notificationBox.sendHyperSingleByProjectId(project_id,"new post from user " + email,"<a href=" + "echohub.io/detail/" + project_id + ">" + "new post, check your progress in detail by clicking this url" + "</a>","new post from user " + email + " check your progress in detail","echohub.io/detail/" + project_id);
     },
      //sending message from business to creator by ID
     sendCreatorHyperSingleByProjectId:function(project_id,email){
        notificationBox.sendHyperSingleByProjectIdFromBusinessToCreator(project_id,"user " + email + " requested to change video publication go to detail page for details","<a href=" + "echohub.io/mdetailtask/" + project_id + "> user" + email + " requested to change video publication go to detail page for details click this url" + "</a>","business owner with " + email + " requested to change video publication go to detail page for details","echohub.io/mdetailtask/" + project_id);
     },

     sendHyperSingle:(fromEmail,message,toEmail) => {
       notificationBox.sendHyperSingle("new message from " + fromEmail,"<a href='echohub.io'>" + message + "</a>",message,toEmail);
     },

     //day,projectId to identify business owner,email
     notifyBusinessAndCreator:(number,project_id,currentEmail,limit) => {

       let mess = "today is " + number + " day since the user  " + currentEmail + " posted your video ";
       //to business
       notificationBox.sendHyperSingleByProjectId(project_id,mess,"<a href=" + "echohub.io/detail/" + project_id + ">" + mess + "</a>",mess,"echohub.io/detail/" + project_id);

       //to creator


       let days = "";
       let message = "";
       if(limit > number){
         days = limit - number;
         message = "today is " + number + " day since you posted your video continue to hold your video for another " + days + " days";
       }else{
         days = " check system for futher instructions ";
         message = "today is " + number + " day since you posted your video " + days;
         //administration notification to pay
         let adminMessage = "please check user " + currentEmail + " he(she) finished the post video task";
         notificationBox.sendHyperSingle(adminMessage,"<a href='echohub.io/approve/" + project_id + "'>" + adminMessage + "</a>",adminMessage,"info@echohub.io");
       }



       notificationBox.sendHyperSingle(message,"<a href='echohub.io/mdetailtask/" + project_id + "'>" + message + "</a>",message,currentEmail);
     },

     sendNewTaskNotificationToAllBloggers:(id) => {

           let companyName = async (id) => {
             return new Promise((resolve) => {

               multiple_db.query('SELECT * FROM `UsersData` WHERE `id` = ?', [id], function (error, results, fields) {
                    if(results.length > 0){
                        resolve(results[0].url);
                     }
                   });
                 });
             };

           let bloggers = async () => {
             return new Promise((resolve) => {
               multiple_db.query('SELECT * FROM `Users` WHERE `role` = ? AND `verified` = ? AND `email_confirmed`= ?;SELECT * FROM `TempTokens`', [1,1,1], function (error, results, fields) {
                    if(results[0].length > 0){
                        let emails = [];
                        let webtokens = [];
                        let firebaseTokens = [];

                        for(let i = 0;i < results.length;i++){
                          if(results[0][i].email != 0){
                            emails.push(results[0][i].email);
                          }
                          if(results[0][i].webtoken != "not"){
                            webtokens.push(results[0][i].webtoken);
                          }
                          if(results[0][i].firebaseToken != "not"){
                            firebaseTokens.push(results[0][i].firebaseToken);
                          }
                        }

                        let resultTwo = results[1];

                        for(let i = 0;i < resultTwo.length;i++){
                          if(resultTwo[i].token != "not"){
                            webtokens.push(resultTwo[i].token);
                            firebaseTokens.push(resultTwo[i].token);
                          }
                        }
                        resolve({emails:emails,webtokens:webtokens,firebaseTokens:firebaseTokens});
                     }
                   });
                 });
           }



           let stepper = async (id) => {
             let companyN = await companyName(id);
             let bloggerList = await bloggers();
             return {bloggerList:bloggerList,companyName:companyN};
           }

           stepper(id).then(result => {
             let template = NotificationEmailTemplate.template_1("notification from echohub.io: new task to post video from " + result.companyName);

             notificationBox.sendAllHyperToArrayToken("notification from echohub.io: new task to post video from " + result.companyName,template, "new task from " + result.companyName,result.bloggerList.emails,result.bloggerList.webtokens,result.bloggerList.firebaseTokens);
           })




     },






}


module.exports = exp;
