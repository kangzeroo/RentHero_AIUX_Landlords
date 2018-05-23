import axios from 'axios'
import { TENANT_AD_MS } from '../API_URLS'
import authHeaders from '../authHeaders'

export const saveFriendlyNameToLeads = (identityId, friendlyName) => {
  const p = new Promise((res, rej) => {
    axios.post(`${TENANT_AD_MS}/save_friendly_name_to_leads`, { identityId, friendlyName, }, authHeaders())
      .then((data) => {
        // once we have the response, only then do we dispatch an action to Redux
        res(data.data)
      })
      .catch((err) => {
        rej(err)
      })
  })
  return p
}

export const updateLeadInfo = (identity_id, first_name, last_name, phone, email) => {
  const p = new Promise((res, rej) => {
    axios.post(`${TENANT_AD_MS}/update_lead_information`, { identity_id, first_name, last_name, phone, email, }, authHeaders())
      .then((data) => {
        // once we have the response, only then do we dispatch an action to Redux
        res(data.data)
      })
      .catch((err) => {
        rej(err)
      })
  })
  return p
}

export const saveQualificationAnswer = (session_id, identity_id, question_id, response) => {
  const p = new Promise((res, rej) => {
    axios.post(`${TENANT_AD_MS}/save_qualification_answer_for_user`, { session_id, identity_id, question_id, response, }, authHeaders())
      .then((data) => {
        // once we have the response, only then do we dispatch an action to Redux
        res(data.data)
      })
      .catch((err) => {
        rej(err)
      })
  })
  return p
}

export const getQualificationStatus = (session_id, identity_id, ad_id) => {
  const p = new Promise((res, rej) => {
    axios.post(`${TENANT_AD_MS}/get_qualification_status`, { session_id, identity_id, ad_id, }, authHeaders())
      .then((data) => {
        // once we have the response, only then do we dispatch an action to Redux
        res(data.data)
      })
      .catch((err) => {
        rej(err)
      })
  })
  return p
}

export const requestTour = (ad_id, identity_id, requested_for) => {
  const p = new Promise((res, rej) => {
    axios.post(`${TENANT_AD_MS}/request_tour`, { ad_id, identity_id, requested_for, }, authHeaders())
      .then((data) => {
        // once we have the response, only then do we dispatch an action to Redux
        res(data.data)
      })
      .catch((err) => {
        rej(err)
      })
  })
  return p
}
