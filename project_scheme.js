checkvideoByProject -- completed tasks 0 - need attention, 1 approved -
usersvideo - 1 approved, 2 no, 3 - rejected
uniquenames
1 -- open task,2- under consideration,3 - finally completed,4- system approval

uniquenames.open_for_verification
1 - verified by system , 2 verified by user, 3 - video was deleted


add Notification -> setBan
add Notification -> closeorders

//push_not

//send aadditional notifications
let notificationBoxCentralMessages = require('../models/notificationBoxCentralMessages.js');

let notificationBox = require('../models/notificationBox.js');
notificationBox.sendHyperSingle("new message from " + data.email,"<a href='echohub.io'>" + message + "</a>",message,data.sendemail);
notificationBox.sendHyperSingleByProjectId(projectId,title,htmlmessage,cleanmessage,url);
//send aadditional notifications

setvideo --- setVideoUrl Controller  https://echohub.io/detail/96




<PayPalButton
                    amount={amountSum}

                    onSuccess={(details, data) => {

                       console.log(details);
                      // console.log("-----------");
                       console.log(data);
                      // console.log("-----------");
                      // console.log("Transaction completed by " + details.payer.name.given_name);

                      var insertId = localStorage.getItem("insertId");
                      var transactionId = details.id;
                      var orderId = data.orderID;
                      var payerID = data.payerID;
                      var payerEmail = details.payer.email_address;
                      var given_name = details.payer.name.given_name;
                      var surname = details.payer.name.surname;
                      var amount = details.purchase_units[0].amount.value;
                      var create_time = details.create_time;

                      //console.log(amount);

                      var sendObject = {
                        "insertId":insertId,
                        "transactionId":transactionId,
                        "orderId":orderId,
                        "payerID":payerID,
                        "payerEmail":payerEmail,
                        "given_name":given_name,
                        "surname":surname,
                        "amount":amount,
                        "create_time":create_time
                      }

                      PaymentService.sendPayment(sendObject);


                      // OPTIONAL: Call your server to save the transaction
                      // return fetch("/paypal-transaction-complete", {
                      //   method: "post",
                      //   body: JSON.stringify({
                      //     orderID: data.orderID
                      //   })
                      // });
                    }}

                    options={{
                      clientId: ProductionClientId,
                      currency:"USD",

                    }}

                    style={{
                      shape: 'rect',
                      color: 'blue',
                      layout: 'vertical',
                      label: 'paypal'
                    }}
                  />

//plan 5

<div id="paypal-button-container-P-41442501Y1533215YME6FZJY"></div>
<script src="https://www.paypal.com/sdk/js?client-id=AQBizLLv9gVfG0uMcTMIDHqXhbviVFaAAi-bhlPDJbOaSsaudsPjSf88-ac-czpp9AR-FsqFaZUoUuEw&vault=true&intent=subscription" data-sdk-integration-source="button-factory"></script>
<script>
  paypal.Buttons({
      style: {
          shape: 'rect',
          color: 'blue',
          layout: 'vertical',
          label: 'subscribe'
      },
      createSubscription: function(data, actions) {
        return actions.subscription.create({
          /* Creates the subscription */
          plan_id: 'P-41442501Y1533215YME6FZJY'
        });
      },
      onApprove: function(data, actions) {
        alert(data.subscriptionID); // You can add optional success message for the subscriber here
      }
  }).render('#paypal-button-container-P-41442501Y1533215YME6FZJY'); // Renders the PayPal button
</script>


//plan 100
                  <div id="paypal-button-container-P-9CD531006F2107427ME6GE4Q"></div>
                  <script src="https://www.paypal.com/sdk/js?client-id=AQBizLLv9gVfG0uMcTMIDHqXhbviVFaAAi-bhlPDJbOaSsaudsPjSf88-ac-czpp9AR-FsqFaZUoUuEw&vault=true&intent=subscription" data-sdk-integration-source="button-factory"></script>
                  <script>
                    paypal.Buttons({
                        style: {
                            shape: 'rect',
                            color: 'gold',
                            layout: 'vertical',
                            label: 'subscribe'
                        },
                        createSubscription: function(data, actions) {
                          return actions.subscription.create({
                            /* Creates the subscription */
                            plan_id: 'P-9CD531006F2107427ME6GE4Q'
                          });
                        },
                        onApprove: function(data, actions) {
                          alert(data.subscriptionID); // You can add optional success message for the subscriber here
                        }
                    }).render('#paypal-button-container-P-9CD531006F2107427ME6GE4Q'); // Renders the PayPal button
                  </script>


                  <PayPalButton
                  amount={amountSum}
                  vault={true}
                  createSubscription={paypalSubscribe}
                  onApprove={(details, data) => {

                       console.log(details);
                      // console.log("-----------");
                       console.log(data);

                      //one time payment
                      // var insertId = localStorage.getItem("insertId");
                      // var transactionId = details.id;
                      // var orderId = data.orderID;
                      // var payerID = data.payerID;
                      // var payerEmail = details.payer.email_address;
                      // var given_name = details.payer.name.given_name;
                      // var surname = details.payer.name.surname;
                      // var amount = details.purchase_units[0].amount.value;
                      // var create_time = details.create_time;

                      //subscribtion
                      // billingToken: "BA-8UC14793AL6457456"
                      // facilitatorAccessToken: "A21AAJF6yKHlMCBK7ZvA1_r1uRIw8UNA4d0eS48Nh2yDyAkI3Prx77jEOYgec1jiX3JwEOD3WvEvx4ALtjio7rrP8rDJh6rZA"
                      // orderID: "6US02800038091236"
                      // paymentID: null
                      // subscriptionID: "I-YX82X91BYUWU"

                      if(data.paymentID == null){
                        data.paymentID = 999;
                      }
                      var insertId = localStorage.getItem("insertId");
                      var transactionId = details.orderID;
                      var orderId = data.orderID;
                      var payerID = data.paymentID;
                      var payerEmail = details.payer.email_address;
                      var given_name = details.payer.name.given_name;
                      var surname = details.payer.name.surname;
                      var amount = details.purchase_units[0].amount.value;
                      var create_time = details.create_time;

                      //console.log(amount);

                      var sendObject = {
                        "insertId":insertId,
                        "transactionId":transactionId,
                        "orderId":orderId,
                        "payerID":payerID,
                        "payerEmail":payerEmail,
                        "given_name":given_name,
                        "surname":surname,
                        "amount":amount,
                        "create_time":create_time
                      }

                      //PaymentService.sendPayment(sendObject);

                    }}


                  options={{
                      clientId: DevelopmentClientId,
                      currency:"USD",
                      vault:true,
                      intent:"subscription"

                    }}

                  style={{
                    shape: 'rect',
                    color: 'blue',
                    layout: 'vertical',
                    label: 'subscribe'
                  }}
                  />
