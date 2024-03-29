import {
  CHANGE_CURRENT_AD,
  SAVE_REPRESENTATIVE,
} from '../../actions/action_types'

const INITIAL_STATE = {
  current_ad: {},
  representative: {},
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
    case CHANGE_CURRENT_AD:
      return {
        ...state,
        current_ad: action.payload,
      }
    case SAVE_REPRESENTATIVE:
      return {
        ...state,
        representative: action.payload,
      }
		default:
			return {
				...state
			}
	}
}
