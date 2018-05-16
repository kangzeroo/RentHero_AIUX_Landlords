import {
  SET_INPUT_STATE,
} from '../action_types'

export const setInputStateInRedux = (state) => {
  return (dispatch) => {
    dispatch({
      type: SET_INPUT_STATE,
      payload: state,
    })
  }
}
