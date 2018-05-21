import {
  CHANGE_LANGUAGE,
  SHOW_INTEREST,
} from '../action_types'

// change the language of the app
export const changeAppLanguage = (languageCode) => {
  // dispatch lets you send actions to Redux
  localStorage.setItem('rentburrow_lang', languageCode)
  return (dispatch) => {
    dispatch({
      type: CHANGE_LANGUAGE,
      payload: languageCode,
    })
  }
}

export const showInterest = () => {
  return (dispatch) => {
    dispatch({
      type: SHOW_INTEREST,
      payload: true,
    })
  }
}
