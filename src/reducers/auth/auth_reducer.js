import {
  SAVE_IDENTITY,
  SAVE_SESSION_ID,
} from '../../actions/action_types'

const INITIAL_STATE = {
  identityId: '',
  session_id: '',
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
    case SAVE_IDENTITY:
      return {
        ...state,
        identityId: action.payload,
      }
    case SAVE_SESSION_ID:
      return {
        ...state,
        session_id: action.payload,
      }
		default:
			return {
				...state
			}
	}
}
