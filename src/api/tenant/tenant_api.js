import axios from 'axios'
// import {  } from '../API_URLS'
import authHeaders from '../authHeaders'

// save the corporation to server and await for response
export const getTenantInfo = (tenantID) => {
  const p = new Promise((res, rej) => {
    // axios.post(`${'https://localhost:1000'}/get_tenant_info`, { tenant_id: tenantID }, authHeaders())
    //   .then((data) => {
    //     // once we have the response, only then do we dispatch an action to Redux
    //     res(data.data)
    //   })
    //   .catch((err) => {
    //     rej(err)
    //   })
    return Promise.resolve({})
  })
  return p
}
