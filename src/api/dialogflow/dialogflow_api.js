import axios from 'axios'
import { DIALOGFLOW_MS } from '../API_URLS'
import authHeaders from '../authHeaders'


export const initDialogFlow = (ad_id) => {
  const p = new Promise((res, rej) => {
    axios.post(`${DIALOGFLOW_MS}/init_dialogflow`, { ad_id }, authHeaders())
      .then((data) => {
        // console.log(data.data)
        localStorage.setItem('session_id', data.data.session_id)
        console.log('session_id', data.data.session_id)
        res(data.data)
      })
      .catch((err) => {
        rej(err)
      })
  })
  return p
}

export const sendMessageToDialogFlow = (message, session_id, ad_id) => {
  const p = new Promise((res, rej) => {
    axios.post(`${DIALOGFLOW_MS}/send_message`, { message, session_id, ad_id }, authHeaders())
      .then((data) => {
        // console.log(data.data)
        res(data.data)
      })
      .catch((err) => {
        rej(err)
      })
  })
  return p
}
