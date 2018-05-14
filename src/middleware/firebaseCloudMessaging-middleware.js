// middleware created for Redux actions that want to go through an open connection

import Rx from 'rxjs'
import firebase from 'firebase'
import { saveFirebaseClientId } from '../api/fcm/firebase_cloud_messaging'
import {
  REQUEST_NOTIFICATIONS_PERMISSION,
  MESSAGE_RECEIVED,
} from '../actions/action_types'
import { addChatHistory } from '../actions/firebase/firebase_cloud_messaging_actions'
import { FIREBASE_CREDS } from '../api/ENV_CREDs'

// console.log(FIREBASE_CREDS)
firebase.initializeApp(FIREBASE_CREDS)
const messaging = firebase.messaging()

// this middleware is to establish websocket connections for messaging
// our websocket lives here in rxjs observables
const establishFirebaseMessaging = (() => {

    // middleware has access to the redux store
    return store => next => action => {

      switch (action.type) {

        // display the notifications permission
        case REQUEST_NOTIFICATIONS_PERMISSION:
          // first request permission to display desktop notifications
          messaging.requestPermission()
            .then(() => {
              // then get a FCM token
              return messaging.getToken()
            })
            .then((token) => {
              console.log(token)
              saveFirebaseClientId(localStorage.getItem('session_id'), token)
              next(action)
            })
            .catch((err) => {
              console.log(err)
              next(action)
            })
          // listen for any token refreshes and save them as most updated version
          messaging.onTokenRefresh(() => {
            messaging.getToken()
              .then((refreshedToken) => {
                console.log(refreshedToken)
                saveFirebaseClientId(localStorage.getItem('session_id'), refreshedToken)
                // console.log('Token refreshed: ', refreshedToken)
                next()
              })
              .catch((err) => {
                console.log('Unable to retrieve refreshed token ', err)
              })
          })
          // on receiving a message, dispatch a redux action
          break;

        // This action is irrelevant to us, pass it on to the next middleware
        default:
          return next(action);
      }
    }
})()

export default establishFirebaseMessaging
