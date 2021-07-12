const multer = require("multer");
var db_multiple = require('../config/multiple_mysql.js');
var timeconverter = require("../models/timeconverter.js");
var helpers = require("../models/helpers.js");
var config = require("../config/config.js");


  var profileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, config.getprofileImagesUrl())
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
  })

  var upload = multer({ storage: profileStorage,
  limits:{fileSize:10485760}
});

const exportConst = function(app){

  // Home page route.

  app.post('/usermainphoto', upload.single("photo"), async function (req, res, next) {

        try{
          const path = req.file.path;
          const name = req.file.filename;
          const { email } = req.body;

          const setRecord = new function () {
             return new Promise((resolve, reject) => {
               var insert  = { filename: name,email:email,uploadDate:timeconverter.getUnixtime(),};


               db_multiple.query('SELECT image_url FROM `Users` WHERE `email` = ? LIMIT 1', [email], function (error, res, fields) {

                 if(res.length > 0){

                        let currentProfileImage = res[0].image_url;

                        if(currentProfileImage === "https://www.daily-sun.com/assets/news_images/2017/08/14/thumbnails/Daily-Sun-38-01-14-08-2017.jpg"){
                          db_multiple.query('UPDATE Users SET image_url = ? WHERE email = ?', [name,email], function (error, results, fields) {
                            if (error){
                              resolve(error);
                            }else{
                              resolve(results);
                            }

                          });
                        }else{
                          helpers.deletePictures(config.getprofileImagesUrl() + "/" + currentProfileImage).then(res => {
                            db_multiple.query('UPDATE Users SET image_url = ? WHERE email = ?', [name,email], function (error, results, fields) {
                              if (error){
                                resolve(error);
                              }else{
                                resolve(results);
                              }
                            });
                          })
                          //delete previous image
                        }
                     }

                   });
               //add before delete operation


             });
          };

          const ResponseEvent = (databaseInsertInfo) => {
            return "response sended";
          }

          const UploadFunction = async function(){
             try {
                 const databaseInsertInfo = await setRecord();
                 const response = await ResponseEvent(databaseInsertInfo);
                 return response;
             }catch (e){
                 //handle errors as needed
             }
          };

          UploadFunction().then(response => {
            res.json(name);
          })



        }catch (ex) {
          res.status(400).send({ error: ex });

          console.log(ex);
        }

    })

    //other routes..
}

module.exports = exportConst;
