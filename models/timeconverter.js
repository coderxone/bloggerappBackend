var moment = require('moment-timezone');

module.exports = {

     timeConverter:function(UNIX_timestamp){
      var a = new Date(UNIX_timestamp * 1000);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
      return time;
    },
     timeConverter_ru:function(UNIX_timestamp){

      var a = new Date(UNIX_timestamp);
      //var months = ['Янв','Фев','Март','Апрель','Май','Июнь','Июль','Авг','Сент','Окт','Нояб','Дек'];
      var year = a.getUTCFullYear() + 1;
      //var month = months[a.getMonth()];
      var month = a.getUTCMonth() + 1;
      var date = a.getUTCDate();
      var hour = a.getUTCHours();
      var min = a.getUTCMinutes();
      var sec = a.getUTCSeconds();

      var converted_month = "0";

      if(month.length > 1){
        converted_month = month;
      }else{
        converted_month = "0" + month;
      }


      //var time = date + ' ' + converted_month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
      var time = date + ' ' + converted_month + ' ' + year + ' ';
      return time;

      //new Date(unix_timestamp * 1000).format('h:i:s')
    },

    timeConverter_us:function(UNIX_timestamp){

     return moment.unix(UNIX_timestamp / 1000).format("MM/DD/YYYY h:mm:ss");

   },


    timeConverter_us_date:function(UNIX_timestamp){

     return moment.unix(UNIX_timestamp).format("MM/DD/YYYY");

   },
    timeConverter_us_time:function(UNIX_timestamp){

     return moment.unix(UNIX_timestamp).format("hh:mm");

   },


    getDateStart:function(){

        //var d = moment().startOf('day').tz('Asia/Almaty').valueOf() / 1000; //return unix timestamp
        var d = moment().startOf('day').valueOf() / 1000; //return unix timestamp

        return d;

    },

    getDateFinish:function(){

        //var d = moment().endOf('day').tz('Asia/Almaty').valueOf() / 1000;
        var d = moment().endOf('day').valueOf() / 1000;

        return d;

    },

    convertToUnix:function(jsdate){
        //new Date().getTime()
        //'2012.08.10'
        var converdate = parseInt((new Date(jsdate).getTime() / 1000).toFixed(0));

        return converdate;

    },
    convertPayPalDateToUnix:function(jsdate){
        //new Date().getTime()
        //'2012.08.10'
        var converdate = Date.parse(jsdate);

        return converdate;

    },

    convertToUnixjsGetTime:function(jsdate){
        //new Date().getTime()
        //'2012.08.10'
        var converdate = parseInt((new Date(jsdate).getTime() / 1000).toFixed(0));

        return converdate;

    },

    converUnixTojsTime:function(UNIX_timestamp){

      var a = new Date(UNIX_timestamp);
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;

      return time;

    },

    getUnixfromDate_Time:function(value){

       return moment(value, "MM/dd/yyyy HH:mm:ss").unix();

     },

    getUnixtime:function(){

      var unixtime = moment().unix();

      return unixtime;

    },
    getunixMonth:function(UNIX_timestamp){
     var a = new Date(UNIX_timestamp * 1000);
     var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
     var year = a.getFullYear();
     var month = months[a.getMonth()];
     // var date = a.getDate();
     // var hour = a.getHours();
     // var min = a.getMinutes();
     // var sec = a.getSeconds();
     //var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
     return month;
   },

    getcurrentMonth:function(){
     var a = new Date();
     var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
     var year = a.getFullYear();
     var month = months[a.getMonth()];
     // var date = a.getDate();
     // var hour = a.getHours();
     // var min = a.getMinutes();
     // var sec = a.getSeconds();
     //var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
     return month;
   },

   getUnixDate:function(UNIX_timestamp){

    var today = new Date(UNIX_timestamp * 1000);
    var dd = String(today.getDate()).padStart(2, '0');

    return dd;
   },

    getcurrentDate:function(){

     var today = new Date();
     var dd = String(today.getDate()).padStart(2, '0');

     return dd;
    },


}
