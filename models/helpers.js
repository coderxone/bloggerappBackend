
module.exports = {

     rangeSubscribers:function(min,max){

       min = Math.ceil(min);
       max = Math.floor(max);
       return Math.floor(Math.random() * (max - min + 1)) + min;

    },
     readablePrice:function(value){

       var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });

      return formatter.format(value);

      },

     readableNumber:function(value){

       var formatter = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(value);

       return formatter;

      },

      







}
