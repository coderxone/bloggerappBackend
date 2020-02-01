var moment = require('moment-timezone');
var notificationModel = require("./notificationModel.js");
var domainName = "http://test.com";

module.exports = {

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

      }

}
