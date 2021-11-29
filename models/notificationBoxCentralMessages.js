let notificationBox = require('../models/notificationBox.js');
var multiple_db = require('../config/multiple_mysql.js');
var NotificationEmailTemplate = require('../models/emailTemplatesModels/NotificationEmailTemplate.js');
var ActionEmailTemplate = require('../models/emailTemplatesModels/ActionEmailTemplate.js');
var NewsNotification = require('../models/emailTemplatesModels/NewsNotification.js');
let LocalizeComponent = require('../localization/localization.js');

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

     //sending notification about the task
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

     sendNotificationToAllBloggersToCompleteProfile:() => {

      
          const findBloggers = async () => {
            return new Promise(resolve => {

              multiple_db.query('SELECT id, email, email_confirmed, points, verified, firstName, lastName, phone, link,	image_url, socialNetworks,country  FROM Users WHERE role = ?', [1], function (error, results, fields) {

                    resolve(results);
              
              });

            });
          }
          //analyse data
          const notifierLogic = async (list) => {
            return new Promise(resolve => {

              let generateNotification = [];
              //check link if generated
              for(let i = 0;i < list.length;i++){

                  let initNotificationObject = {
                    id:list[i].id,
                    email:list[i].email,
                    sendEmailConfirmation:false,
                    country:'',
                    emailConfirmationLink:'',
                    completeRegistration:false,
                    completeProfileFirstName:false,
                    completeProfileLastName:false,
                    completeProfileImage:false,
                    status:false,
                  };


                  if(list[i].link != '0' && list[i].email_confirmed == 0){
                    initNotificationObject.sendEmailConfirmation = true;
                    initNotificationObject.emailConfirmationLink = list[i].link;
                    initNotificationObject.status = true;
                  }

                  if(list[i].country != 0){
                    initNotificationObject.country = list[i].country;
                  }
                  
                  if(list[i].socialNetworks == null){
                    initNotificationObject.completeRegistration = true;
                    initNotificationObject.status = true;
                  }
                  if(list[i].firstName == 0){
                    initNotificationObject.completeProfileFirstName = true;
                    initNotificationObject.status = true;
                  }
                  if(list[i].lastName == 0){
                    initNotificationObject.completeProfileLastName = true;
                    initNotificationObject.status = true;
                  }
                  if(list[i].image_url == 'no-image.png' || list[i].image_url == '0'){
                    initNotificationObject.completeProfileImage = true;
                    initNotificationObject.status = true;
                  }

                  generateNotification.push(initNotificationObject);
                  
              }

              resolve(generateNotification);

            });
          }
          
          
          
          const LiGenerator = async (objArray) => {
            return new Promise(resolve => {


              for(let i = 0;i < objArray.length;i++){
                let collector = '';

                if(objArray[i].status){
                    if(objArray[i].sendEmailConfirmation){
                      collector += '<li style="padding-bottom:4px"><a  target="_blank" href="https://echohub.io/confirm/' + objArray[i].emailConfirmationLink + '">Please confirm your email</a></li>';
                    }
                    if(objArray[i].completeRegistration){
                      collector += '<li style="padding-bottom:4px"><a  target="_blank" href="echohub.io/login"> Please complete registration</a></li>';
                    }
                    if(objArray[i].completeProfileFirstName){
                      collector += '<li style="padding-bottom:4px"><a  target="_blank" href="echohub.io/login">Please fill out First name</a></li>';
                    }
                    if(objArray[i].completeProfileLastName){
                      collector += '<li style="padding-bottom:4px"><a  target="_blank" href="echohub.io/login">Please fill out Last name</a></li>';
                    }
                    if(objArray[i].completeProfileImage){
                      collector += '<li style="padding-bottom:4px"><a  target="_blank" href="echohub.io/login">Please download Profile image</a></li>';
                    }
    
                    objArray[i].liTag = ActionEmailTemplate.activationTemplate(objArray[i].email,collector);
                }
                
              }
  
              resolve(objArray);

            });
          }
          
          const SendToMass = async (objArray) => {
            return new Promise(resolve => {


              for(let i = 0;i < objArray.length;i++){

                if(objArray[i].status){
                  notificationBox.sendHyperSingle("Notification from echohub.io: actions required ",objArray[i].liTag,"Notification from echohub.io: actions required ",objArray[i].email);
                  objArray[i].messageStatus = "sended";
                }else{
                  objArray[i].messageStatus = "not";
                }
                
              }
  
              resolve(objArray);

            });
          }



          const stepper = async () => {
            let foundBloggers = await findBloggers();
            let notifierList = await notifierLogic(foundBloggers);
            let notifierListWithTemplate = await LiGenerator(notifierList);
            let finalRes = await SendToMass(notifierListWithTemplate);
            return finalRes;
          }

          stepper().then(response => {
            //https://echohub.io/confirm/jeVrNH45vQr2SVyfsqgyct
              console.log("daily notifications sended");
              //ReactDOMServer
              
            });

     },


     sendNotificationToAll:(id,title,cleanMessage) => {

        let htmlMessage = NewsNotification.template('https://echohub.io/news/' + id,'Latest news: ' + title);
        notificationBox.sendAllHyperAutomatic(title,htmlMessage,cleanMessage);

     },








}


module.exports = exp;
