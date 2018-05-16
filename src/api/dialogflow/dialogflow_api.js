import axios from 'axios'
import { DIALOGFLOW_MS } from '../API_URLS'
import authHeaders from '../authHeaders'


export const initDialogFlow = (session_id, ad_id, identityId, botId) => {
  const p = new Promise((res, rej) => {
    axios.post(`${DIALOGFLOW_MS}/init_dialogflow`, { session_id, ad_id, identityId, botId, }, authHeaders())
      .then((data) => {
        console.log(data.data)
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

export const sendMessageToDialogFlow = (message, session_id, ad_id, bot_id, identity_id) => {
  console.log('sending message to dialogflow...')
  const p = new Promise((res, rej) => {
    axios.post(`${DIALOGFLOW_MS}/send_message`, { message, session_id, ad_id, bot_id, identity_id }, authHeaders())
      .then((data) => {
        console.log(data.data)
        res(data.data)
      })
      .catch((err) => {
        rej(err)
      })
  })
  return p
}

export const dialogFlowPropertyQuestion = (session_id, ad_id, identityId, botId) => {
  const p = new Promise((res, rej) => {
    axios.post(`${DIALOGFLOW_MS}/dialogflow_property_question`, { session_id, ad_id, identityId, botId, }, authHeaders())
      .then((data) => {
        console.log(data.data)
        res(data.data)
      })
      .catch((err) => {
        rej(err)
      })
  })
  return p
}

export const dialogFlowInitQualification = (session_id, ad_id, identityId, botId) => {
  const p = new Promise((res, rej) => {
    axios.post(`${DIALOGFLOW_MS}/dialogflow_init_qualification`, { session_id, ad_id, identityId, botId, }, authHeaders())
      .then((data) => {
        console.log(data.data)
        res(data.data)
      })
      .catch((err) => {
        rej(err)
      })
  })
  return p
}

export const dialogFlowCompleteQualification = (session_id, ad_id, identityId, botId) => {
  const p = new Promise((res, rej) => {
    axios.post(`${DIALOGFLOW_MS}/dialogflow_copmlete_qualification`, { session_id, ad_id, identityId, botId, }, authHeaders())
      .then((data) => {
        console.log(data.data)
        res(data.data)
      })
      .catch((err) => {
        rej(err)
      })
  })
  return p
}
