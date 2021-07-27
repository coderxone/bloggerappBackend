
let notificationBox = require('../models/notificationBox.js');
var multiple_db = require('../config/multiple_mysql.js');

const exp = {

      //sending message from added video from creator
     sendHyperSingleByProjectId:function(project_id,email){
        notificationBox.sendHyperSingleByProjectId(project_id,"new post from user " + email,"<a href=" + "echohub.io/detail/" + project_id + ">" + "new post, check your progress in detail by clicking this url" + "</a>","new post from user " + email + " check your progress in detail","echohub.io/detail/" + project_id);
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






}


module.exports = exp;
