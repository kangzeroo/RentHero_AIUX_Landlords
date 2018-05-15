import {
  CHANGE_CURRENT_AD,
} from '../action_types'

// change the language of the app
export const saveAdToRedux = (ad) => {
  // dispatch lets you send actions to Redux
  return (dispatch) => {
    dispatch({
      type: CHANGE_CURRENT_AD,
      payload: ad,
    })
  }
}
