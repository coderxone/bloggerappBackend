var moment = require('moment-timezone');
var notificationModel = require("./notificationModel.js");
var domainName = "https://echohub.io";
let helper = require('./helpers.js');

module.exports = {

      sendSingleEmail:function(title,htmlmessage,toUser){

              const sendMessage = async () => {
                   await notificationModel.sendMessage(title,htmlmessage,toUser).then(function(result) {

                      console.log(result.response);

                  });
              };

              sendMessage();

              return "ok";
      },


      sendHyperSingle:function(title,htmlmessage,cleanmessage,toUser){

              const sendMessage = async () => {
                   await notificationModel.sendMessage(title,htmlmessage,toUser).then(function(result) {

                      console.log(result.response);

                  });
              };

              sendMessage();

              const sendFirebasetoSingleAndroid = async () => {
                   await notificationModel.sendFPMtoSingle(toUser,title,cleanmessage,"new message","new message").then(function(result) {

                      console.log(result);

                  });
              };

              sendFirebasetoSingleAndroid();

              const sendWebFirebasetoSingle = async () => {
                   await notificationModel.sendWebFPMtoSingle(toUser,title,cleanmessage,domainName).then(function(result) {

                      console.log(result);

                  });
              };

              sendWebFirebasetoSingle();

              return "ok";
      },
      sendHyperSingleByProjectId:function(projectId,title,htmlmessage,cleanmessage,url){


              let toUser = "";

              const sendMessage = async (title,htmlmessage,toUser) => {
                   await notificationModel.sendMessage(title,htmlmessage,toUser).then(function(result) {

                      console.log(result.response);

                  });
              };



              const sendFirebasetoSingleAndroid = async (title,cleanmessage,toUser) => {
                   await notificationModel.sendFPMtoSingle(toUser,title,cleanmessage,"new message","new message").then(function(result) {

                      console.log(result);

                  });
              };



              const sendWebFirebasetoSingle = async (toUser,title,cleanmessage,domainName) => {
                   await notificationModel.sendWebFPMtoSingle(toUser,title,cleanmessage,domainName).then(function(result) {

                      console.log(result);

                  });
              };



              helper.getUserEmailByProjectId(projectId).then(res => {
                let email = res.email;

                sendMessage(title,htmlmessage,email);
                sendFirebasetoSingleAndroid(title,cleanmessage,email);
                sendWebFirebasetoSingle(email,title,cleanmessage,url);

              })

              return "ok";
      },
      
      
      sendHyperSingleByProjectIdFromBusinessToCreator:function(projectId,title,htmlmessage,cleanmessage,url){


              let toUser = "";

              const sendMessage = async (title,htmlmessage,toUser) => {
                   await notificationModel.sendMessage(title,htmlmessage,toUser).then(function(result) {

                      console.log(result.response);

                  });
              };



              const sendFirebasetoSingleAndroid = async (title,cleanmessage,toUser) => {
                   await notificationModel.sendFPMtoSingle(toUser,title,cleanmessage,"new message","new message").then(function(result) {

                      console.log(result);

                  });
              };



              const sendWebFirebasetoSingle = async (toUser,title,cleanmessage,domainName) => {
                   await notificationModel.sendWebFPMtoSingle(toUser,title,cleanmessage,domainName).then(function(result) {

                      console.log(result);

                  });
              };



              helper.getUserEmailByProjectIdFromVideo(projectId).then(res => {
                let email = res.user_email;

                sendMessage(title,htmlmessage,email);
                sendFirebasetoSingleAndroid(title,cleanmessage,email);
                sendWebFirebasetoSingle(email,title,cleanmessage,url);

              })

              return "ok";
      },

      sendAllHyper:function(title,htmlmessage,cleanmessage,EmailArray){

        const sendToAllMessage = async () => {
             await notificationModel.sendToAllMessage(title,htmlmessage,EmailArray).then(function(result) {

                console.log(result.response);

            });
        };

        sendToAllMessage();

        const sendFPMtoAllUsersAndroid = async () => {
             await notificationModel.sendFPMtoAllUsers(title,cleanmessage,"new message","new message").then(function(result) {

                console.log(result);

            });
        };

        sendFPMtoAllUsersAndroid();

        const sendWebFPMtoAllUsers = async () => {
             await notificationModel.sendWebFPMtoAllUsers(title,cleanmessage,domainName).then(function(result) {

                console.log(result);

            });
        };

        sendWebFPMtoAllUsers();

      },
      
      
      sendAllHyperAutomatic:function(title,htmlmessage,cleanmessage){

        const sendToAllMessage = async () => {
             await notificationModel.sendToAllMessageFromDB(title,htmlmessage).then(function(result) {

                console.log(result.response);

            });
        };

        sendToAllMessage();

        const sendFPMtoAllUsersAndroid = async () => {
             await notificationModel.sendFPMtoAllUsers(title,cleanmessage,"new message","new message").then(function(result) {

                console.log(result);

            });
        };

        sendFPMtoAllUsersAndroid();

        const sendWebFPMtoAllUsers = async () => {
             await notificationModel.sendWebFPMtoAllUsers(title,cleanmessage,domainName).then(function(result) {

                console.log(result);

            });
        };

        sendWebFPMtoAllUsers();

      },

      sendAllHyperToArrayToken:function(title,htmlmessage,cleanmessage,EmailArray,webtokenArray,firebasetokenArray){

        const sendToAllMessage = async () => {
             await notificationModel.sendToAllMessage(title,htmlmessage,EmailArray).then(function(result) {

                console.log(result.response);

            });
        };

        sendToAllMessage();

        const sendFPMtoAllUsersAndroid = async () => {
             await notificationModel.sendFPMtoCurrentArrayToken(title,cleanmessage,"new message","new message",firebasetokenArray).then(function(result) {

                console.log(result);

            });
        };

        sendFPMtoAllUsersAndroid();

        const sendWebFPMtoAllUsers = async () => {
             await notificationModel.sendWebFPMtoAllUsersArray(title,cleanmessage,domainName,webtokenArray).then(function(result) {

                console.log(result);

            });
        };

        sendWebFPMtoAllUsers();

      }

}
