checkvideoByProject -- completed tasks 0 - need attention, 1 approved -
usersvideo - 1 approved, 2 no, 3 - rejected
uniquenames
1 -- open task,2- under consideration,3 - finally completed,4- system approval

uniquenames.open_for_verification
1 - verified by system , 2 verified by user, 3 - video was deleted


add Notification -> setBan
add Notification -> closeorders

//push_not

//send aadditional notifications
let notificationBoxCentralMessages = require('../models/notificationBoxCentralMessages.js');

let notificationBox = require('../models/notificationBox.js');
notificationBox.sendHyperSingle("new message from " + data.email,"<a href='echohub.io'>" + message + "</a>",message,data.sendemail);
notificationBox.sendHyperSingleByProjectId(projectId,title,htmlmessage,cleanmessage,url);
//send aadditional notifications

setvideo --- setVideoUrl Controller  https://echohub.io/detail/96
