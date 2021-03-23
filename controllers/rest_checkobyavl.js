var express = require('express');
var router = express.Router();


// Home page route.
router.post('/check_control_ob', function(req, res) {

    var email = req.body.email;
    var phone = req.body.phone;
    


});



router.get('/show', function(req, res) {

  // res.setHeader('Content-Type', 'application/json');
  // res.send(JSON.stringify({ result: result }));


});




//console.log("load checkobyavl");

module.exports = router;
