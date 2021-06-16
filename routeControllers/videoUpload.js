const multer = require("multer");
var db_multiple = require('../config/multiple_mysql.js');
var timeconverter = require("../models/timeconverter.js");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images/videoUploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
  })

  var upload = multer({ storage: storage,
  limits:{fileSize:42000000}//limit 40 mb
});

const exportConst = function(app){

  // Home page route.

  app.post('/uploaduservideoid', upload.single("video"), async function (req, res, next) {

        try{
          const path = req.file.path;
          const name = req.file.filename;
          const { email } = req.body;

          const setRecord = new function () {
             return new Promise((resolve, reject) => {
               var insert  = { filename: name,email:email,uploadDate:timeconverter.getUnixtime(),};

               db_multiple.query('INSERT INTO downloadVideoLinks SET ?', insert, function (error, results, fields) {
                 if (error) throw error;
                 resolve(results);
               });

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
