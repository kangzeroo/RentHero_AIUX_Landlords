import {
  MESSAGE_RECEIVED,
  SET_INPUT_STATE,
} from '../../actions/action_types'

const INITIAL_STATE = {
  convo_history: [],
  show_input: false,
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
    case MESSAGE_RECEIVED:
      return {
        ...state,
        convo_history: state.convo_history.concat([action.payload]),
      }
    case SET_INPUT_STATE:
      return {
        ...state,
        show_input: action.payload,
      }
		default:
			return {
				...state
			}
	}
}
