import {
  SAVE_IDENTITY,
  SAVE_SESSION_ID,
} from '../action_types'

export const saveIdentityToRedux = (identity) => {
  return (dispatch) => {
    dispatch({
      type: SAVE_IDENTITY,
      payload: identity,
    })
  }
}

export const saveSessionIdToRedux = (session_id) => {
  return (dispatch) => {
    dispatch({
      type: SAVE_SESSION_ID,
      payload: session_id,
    })
  }
}
