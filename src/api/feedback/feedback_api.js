import axios from 'axios'
import { DIALOGFLOW_MS } from '../API_URLS'
import authHeaders from '../authHeaders'


export const saveUserReaction = ({ ad_id, session_id, identity_id, reaction, message_id }) => {
  const p = new Promise((res, rej) => {
    axios.post(`${DIALOGFLOW_MS}/save_user_reaction`, { session_id, ad_id, identity_id, reaction, message_id }, authHeaders())
      .then((data) => {
        res(data.data)
      })
      .catch((err) => {
        rej(err)
      })
  })
  return p
}
