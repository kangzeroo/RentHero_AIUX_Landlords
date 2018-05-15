import {
  CHANGE_CURRENT_AD,
} from '../../actions/action_types'

const INITIAL_STATE = {
  current_ad: {},
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
    case CHANGE_CURRENT_AD:
      return {
        ...state,
        current_ad: action.payload,
      }
		default:
			return {
				...state
			}
	}
}
