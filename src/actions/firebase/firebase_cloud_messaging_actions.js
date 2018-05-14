import {
	REQUEST_NOTIFICATIONS_PERMISSION,
  MESSAGE_RECEIVED,
} from '../action_types'


export const initializeFirebaseNotifications = () => {
	return (dispatch) => {
		dispatch({
			type: REQUEST_NOTIFICATIONS_PERMISSION
		})
	}
}

export const addChatHistory = (message) => {
	return {
		type: MESSAGE_RECEIVED,
		payload: message
	}
}
