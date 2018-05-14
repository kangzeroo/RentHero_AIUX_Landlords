import axios from 'axios'
import { FCM_MS } from '../API_URLS'
import authHeaders from '../authHeaders'

export const saveFirebaseClientId = (session_id, firebase_client_id) => {
  const p = new Promise((res, rej) => {
    axios.post(`${FCM_MS}/save_firebase_client`, { session_id, firebase_client_id, }, authHeaders())
      .then((data) => {
        res(data.data)
      })
      .catch((err) => {
        rej(err)
      })
  })
  return p
}

export const getMostRecentChat = (session_id) => {
  const p = new Promise((res, rej) => {
    axios.post(`${FCM_MS}/chat_history`, { session_id }, authHeaders())
      .then((data) => {
        res(data.data)
      })
      .catch((err) => {
        rej(err)
      })
  })
  return p
}
