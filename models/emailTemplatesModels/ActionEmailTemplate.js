
const exp = {

    activationTemplate:(email,liTag) => {

      let template = '<div style="width:100%"> <div style="width:100%;text-align:center;margin-top:20px;"><a href="https://echohub.io"> <img src="https://echohub.io/newimages/Logo_Echohub.png" alt="echohub.io" width="300" height="150" /></a></div> <h3 style="text-align:center">Hello dear ' + email + ' friend! Need attention:</h3> <div style="display:grid;grid-template-columns: 100%;"> <ul style="justify-self: center;"> ' + liTag + ' </ul> </div> <a href="https://apps.apple.com/us/app/echohub-io/id1563339758" target="_blank" style="width:100%;height:30px;padding-top:5px;padding-bottom:15px;text-align:center;font-size:30px"><div style="font-size:18px;color:black">Download our mobile app for IOS</div></a> <div style="width:100%;text-align:center;padding-top:20px;padding-bottom:20px"><a target="_blank" href="https://apps.apple.com/us/app/echohub-io/id1563339758"> <img src="https://echohub.io/newimages/iphone.png" alt="echohub.io" width="300" height="600" /></a></div> <a href="https://play.google.com/store/apps/details?id=io.echohub.www&hl=en_US&gl=US" target="_blank" style="width:100%;height:30px;padding-top:15px;padding-bottom:15px;text-align:center;font-size:30px"><div style="font-size:18px;color:black">Download our mobile app for ANDROID</div></a> <div style="width:100%;text-align:center;padding-top:20px;padding-bottom:20px"><a target="_blank" href="https://play.google.com/store/apps/details?id=io.echohub.www&hl=en_US&gl=US"> <img src="https://echohub.io/newimages/android.png" alt="echohub.io" width="300" height="600" /></a></div> </div>';

      return template;

    }


}

module.exports = exp;
