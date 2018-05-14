import {
  MESSAGE_RECEIVED,
} from '../../actions/action_types'

const INITIAL_STATE = {
  convo_history: [],
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
    case MESSAGE_RECEIVED:
      return {
        ...state,
        convo_history: state.convo_history.concat([action.payload]),
      }
		default:
			return {
				...state
			}
	}
}
