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
    getprofileImagesUrl:function(){
      if(production){
        return '../../echohub/profileImages';
      }else{
        return './images/profileImages';
      }
    },
    getProfileBackgroundUrl:function(){
      if(production){
        return '../../echohub/backgroundImages';
      }else{
        return './images/backgroundImages';
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
