import {
  CHANGE_LANGUAGE,
  SHOW_INTEREST,
} from '../../actions/action_types'

const INITIAL_STATE = {
  selected_language: 'en',
  showed_interest: false,
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
    case CHANGE_LANGUAGE:
      return {
        ...state,
        selected_language: action.payload,
      }
    case SHOW_INTEREST:
      return {
        ...state,
        showed_interest: action.payload,
      }
		default:
			return {
				...state
			}
	}
}
