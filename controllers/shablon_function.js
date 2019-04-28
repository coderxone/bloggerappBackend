var moment = require('moment-timezone');

module.exports = {

     timeConverter:function(UNIX_timestamp){

      return UNIX_timestamp;
    },


    getDateStart:function(){


        var d = moment().startOf('day').tz('Asia/Almaty').valueOf() / 1000; //return unix timestamp

        return d;

    },

    getDateFinish:function(){


        return "ss";

    },

    convertToUnix:function(jsdate){

        //'2012.08.10'
        var converdate = parseInt((new Date(jsdate).getTime() / 1000).toFixed(0));

    },

    converUnixTojsTime:function(time){



      return time;

    }


}
