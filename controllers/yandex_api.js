var db_multiple = require('../config/multiple_mysql.js');
var request = require('request');


module.exports = function(io){


        io.on('connection', function(socket){


              socket.on('yandex_api', function (data) {

                var device = data.device;

                socket.join(device);

                let jsonObj = {
                  "amount": {
                    "value": "2.00",
                    "currency": "RUB"
                  },
                  "confirmation": {
                    "type": "redirect",
                    "return_url": "kazpoisk.kz"
                  },
                  "capture": true,
                  "description": "Заказ №1"
                };

                var auth = new Buffer('565905' + ':' + 'test_shhe0Fr0aEkioo35_qBKxwPAFmikRnj4TFFQgvkNCp8').toString('base64');

                //749874  //
                //740199  //
                //

                request({
                    url: "https://payment.yandex.net/api/v3/payments",
                    headers: {
                      Authorization: 'Basic ' + auth,
                      'Idempotence-Key': '1234567',
                      'Content-Type': 'application/json'
                    },
                    method: "POST",
                    json: true,
                    body: jsonObj,
                    }, function (error, resp, body){

                       //console.log(body);
                       var confirmationurl = body;

                       if(body.status == "pending"){
                         console.log(body.confirmation.confirmation_url);
                       }


                       console.log(confirmationurl);

                       io.sockets.in(device).emit('yandex_api',{confirmationurl:confirmationurl} );


                       // id: '23c15217-000f-5000-9000-174c8455a55b',
                       // status: 'pending',
                       // paid: false,
                       // amount: { value: '2.00', currency: 'RUB' },
                       // confirmation:
                       //  { type: 'redirect',
                       //    confirmation_url:
                       //     'https://money.yandex.ru/api-pages/v2/payment-confirm/epl?orderId=23c15217-000f-5000-9000-174c8455a55b' },
                       // created_at: '2019-01-04T11:07:03.132Z',
                       // description: 'Заказ №1',
                       // metadata: {},
                       // recipient: { account_id: '565905', gateway_id: '1531889' },
                       // test: true }

                });

// test_shhe0Fr0aEkioo35_qBKxwPAFmikRnj4TFFQgvkNCp8


              });



        });


};
