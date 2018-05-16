import {
  SET_INPUT_STATE,
} from '../action_types'

export const setInputStateInRedux = (input) => {
  return (dispatch) => {
    dispatch({
      type: SET_INPUT_STATE,
      payload: input,
    })
  }
}
