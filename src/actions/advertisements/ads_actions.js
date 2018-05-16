import {
  CHANGE_CURRENT_AD,
  SAVE_REPRESENTATIVE,
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

export const saveBotToRedux = (bot) => {
  // dispatch lets you send actions to Redux
  return (dispatch) => {
    dispatch({
      type: SAVE_REPRESENTATIVE,
      payload: bot,
    })
  }
}
