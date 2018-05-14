// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

// console.log('Successfully initialized service worker!')


// Initialize the Firebase app in the service worker by passing in the messagingSenderId
// firebase.initializeApp({
//   apiKey: "AIzaSyB7aGZCstrslbSzEfXEgk-P2POI0EE59ww",
//   authDomain: "dev-landlordai-8221e.firebaseapp.com",
//   databaseURL: "https://dev-landlordai-8221e.firebaseio.com",
//   projectId: "dev-landlordai-8221e",
//   storageBucket: "dev-landlordai-8221e.appspot.com",
//   messagingSenderId: "667543210133"
// })

firebase.initializeApp({
  apiKey: "AIzaSyAilF8ZVGcyLI6H552qpKesqQQuLvTkj3c",
  authDomain: "staging-landlordai.firebaseapp.com",
  databaseURL: "https://staging-landlordai.firebaseio.com",
  projectId: "staging-landlordai",
  storageBucket: "staging-landlordai.appspot.com",
  messagingSenderId: "537936547806"
})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler((payload) => {
  // only for fcm messages that use 'data' instead of 'notification'
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
    click_action: payload.notification.click_action,
  }
  console.log(payload)
  return self.registration.showNotification(notificationTitle,
      notificationOptions)
})

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a sevice worker
//   `messaging.setBackgroundMessageHandler` handler.


// Open with special Chrome
// $ /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --user-data-dir=/tmp/foo --ignore-certificate-errors --unsafely-treat-insecure-origin-as-secure=https://localhost:4000
// Or use chrome flags
/*
    To enable Chrome to load self-signed SSL certificates via Localhost, go to your Chrome browser and in the address bar type in: <br/>
    - `chrome://flags/#allow-insecure-localhost`<br/>
    And enable `Allow invalid certificates from resources loaded from localhost`
*/

// Test it out

// data only
// curl -X POST --header 'Authorization: key=AAAAlOEUJXU:APA91bE2gV8hmip-Ne8HhcRbeCTp5OLWl3c7VvX7xgsVkYfSEIJp2alURJsR4eoEClP5w4xGkCwARJSs3l-UQngloK0VpNbBtsDskUS-UvCR47sbO4JsVNqIXUk8VYgVLd2gDoS_gV5g' --Header 'Content-Type: application/json' -d '{'to':'fpHksZA11pY:APA91bFJEfbRWW2YMRxqm0Zr73RfjNb4DMddMqGdJFOY4jtlbO4Z86rq0cmlVIhRC4cTw84gzx6FwNrHKCK8QcpWhvK7fgzpta8KU2TUh3d-NSsxKskI0of3QTj_KwW-83FQnCguoOiT','priority':10, 'data': {'title': 'Kangze on Sage 5', 'body': 'Do you have any rooms of 2 left?', 'click_action' : 'https://google.com', 'icon': 'https://d30y9cdsu7xlg0.cloudfront.net/png/23179-200.png'}}' https://fcm.googleapis.com/fcm/send

// notification only
// curl -X POST --header 'Authorization: key=AAAAlOEUJXU:APA91bE2gV8hmip-Ne8HhcRbeCTp5OLWl3c7VvX7xgsVkYfSEIJp2alURJsR4eoEClP5w4xGkCwARJSs3l-UQngloK0VpNbBtsDskUS-UvCR47sbO4JsVNqIXUk8VYgVLd2gDoS_gV5g' --Header 'Content-Type: application/json' -d '{'to':'corF_emTPLE:APA91bFbXO-bucyW5YfCOPVEmaCd4jHfvVSG6gn1ZagVY8gasKcbXvOQ3JLA-QyGCmCQB-KoF1he3E2CTipGJU-QQRDh3MpaPpxT5yj8e3Baq9UgnGjHwu53ryqzM11UZYadGvHDHAAE','priority':10, 'notification': {'title': 'Kangze on Sage 5', 'body': 'Do you have any rooms of 2 left?', 'click_action' : 'https://google.com', 'icon': 'https://d30y9cdsu7xlg0.cloudfront.net/png/23179-200.png'}}' https://fcm.googleapis.com/fcm/send

// notification with data
// curl -X POST --header 'Authorization: key=AAAAlOEUJXU:APA91bE2gV8hmip-Ne8HhcRbeCTp5OLWl3c7VvX7xgsVkYfSEIJp2alURJsR4eoEClP5w4xGkCwARJSs3l-UQngloK0VpNbBtsDskUS-UvCR47sbO4JsVNqIXUk8VYgVLd2gDoS_gV5g' --Header 'Content-Type: application/json' -d '{'to' : 'APA91bHun4MxP5egoKMwt2KZFBaFUH-1RYqx...', 'notification' : {'body' : 'great match!','title' : 'Portugal vs. Denmark','icon' : 'myicon'},'data' : {'Nick' : 'Mario','Room' : 'PortugalVSDenmark'}}' https://fcm.googleapis.com/fcm/send
