// import cryptKey from '../config/config';
var cryptKeyLibrary = require("../config/config.js");
var CryptoJS = require("crypto-js");

module.exports = {

     encrypt:function(data){
        //getCryptKey
        // var data = [{id: 1}, {id: 2}];
        var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), cryptKeyLibrary.getCryptKey()).toString();
        return ciphertext;
     },
     decrypt:function(data){

         var bytes = CryptoJS.AES.decrypt(data, cryptKeyLibrary.getCryptKey());
         var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

         return decryptedData;

      },

}
