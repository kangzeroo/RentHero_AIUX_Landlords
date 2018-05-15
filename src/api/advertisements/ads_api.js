import axios from 'axios'
import { TENANT_AD_MS } from '../API_URLS'
import authHeaders from '../authHeaders'

export const getAdvertisement = (ad_id) => {
  const p = new Promise((res, rej) => {
    axios.post(`${TENANT_AD_MS}/get_ad`, { ad_id }, authHeaders())
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
