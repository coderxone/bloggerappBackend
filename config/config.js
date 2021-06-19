const cryptKey = "cryptoGraph2020";
const production = false;

module.exports = {

    getCryptKey:function(){
      return cryptKey;
    },

    getPhotoUploadUrl:function(){
      if(production){
        return '../../echohub/uploads';
      }else{
        return './images/uploads';
      }
    },
    getVideoUploadUrl:function(){
      if(production){
        return '../../echohub/videoUploads';
      }else{
        return './images/videoUploads';
      }
    },



};
