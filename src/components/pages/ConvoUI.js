// Compt for copying as a ConvoUI
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import uuid from 'uuid'
import { withRouter } from 'react-router-dom'
import firebase from 'firebase'
import {
	Spin,
} from 'antd'
import { initDialogFlow, sendMessageToDialogFlow, dialogFlowInitQualification, dialogFlowExecuteEvent } from '../../api/dialogflow/dialogflow_api'
import { initializeFirebaseNotifications, addChatHistory } from '../../actions/firebase/firebase_cloud_messaging_actions'
import { getMostRecentChat } from '../../api/fcm/firebase_cloud_messaging'
import UserResponse from '../modules/UserResponse'
import GenerateBotHTML from '../generators/GenerateBotHTML'
import GenerateInput from '../generators/GenerateInput'
import AIUX from './AIUX'
import { getAdvertisement } from '../../api/advertisements/ads_api'
import { getRepForProperty } from '../../api/advertisements/bots_api'
import { saveAdToRedux, saveBotToRedux } from '../../actions/advertisements/ads_actions'
import { saveSessionIdToRedux } from '../../actions/auth/auth_actions'
import { setInputStateInRedux } from '../../actions/chat/chat_actions'

class ConvoUI extends Component {

	constructor() {
		super()
		this.state = {
			session_id: '',

			messageID: '',					 // messageID will change every time this.state.nextHtmlBotComp is changed

			nextHtmlBotComp: null,
			nextHtmlUserComp: null,
			nextHtmlInput: null,


			loading: true,

			scroll: '',
		}
		this.feedInObserverable = null
		this.feedInObserver = null
	}

	componentWillMount() {
		this.props.setInputStateInRedux({
			show_input: false,
			input_placeholder: '',
		})
	}

	componentDidMount() {
		this.initObservable()
		this.listenFCM()
		this.listenToVisibility()
		if (this.props.identityId && this.props.identityId.length > 0) {
			this.initializeAdAndDialogflow(this.props.identityId)
		}
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.identityId !== nextProps.identityId) {
			this.initializeAdAndDialogflow(nextProps.identityId)
		}
	}

	initObservable() {
		this.feedInObserverable = Rx.Observable.create((obs) => {
			this.feedInObserver = obs
		}).subscribe({
			next: ({ nextHtmlUserComp, nextHtmlBotComp, nextHtmlInput, messageID }) => {
	      // console.log('OBSERVABLE NEXT')
				this.setState({
					nextHtmlUserComp,
					nextHtmlBotComp,
					nextHtmlInput,
					messageID,
				})
			},
			error: (err) => {
				// console.log('OBSERVABLE ERROR')
				console.log(err)
			},
			complete: (y) => {
				// console.log('OBSERVABLE COMPLETE')
			}
		})
		// this.test()
	}

	// test() {
	// 	this.setState({
	// 		nextHtmlBotComp: (<GenerateBotHTML data={{
	// 			"message":{
	// 				"payload": {
	// 			    "attachment":{
	// 			      "type":"image",
	// 			      "payload":{
	// 			        "url":"https://image.freepik.com/free-photo/cute-cat-picture_1122-449.jpg",
	// 			        "is_reusable":true
	// 			      }
	// 			    }
	// 				}
	// 		  }
	// 		}} />)
	// 	})
	// 	setTimeout(() => {
	// 		this.setState({
	// 			nextHtmlBotComp: (<GenerateBotHTML data={{
	// 				"message":{
	// 					"payload": {
	// 				    "attachment":{
	// 				      "type":"video",
	// 				      "payload":{
	// 				        "url":"https://www.youtube.com/embed/UCmPmkHqHXk",
	// 				        "is_reusable":true
	// 				      }
	// 				    }
	// 					}
	// 			  }
	// 			}} />)
	// 		})
	// 	}, 1000)
	// 	setTimeout(() => {
	// 		this.setState({
	// 			nextHtmlBotComp: (<GenerateBotHTML data={{
	// 				"message":{
	// 					"payload": {
	// 				    "attachment":{
	// 				      "type":"file",
	// 				      "payload":{
	// 				        "url":"https://www.planetebook.com/free-ebooks/a-tale-of-two-cities.pdf",
	// 				        "is_reusable":true
	// 				      }
	// 				    }
	// 					}
	// 			  }
	// 			}} />)
	// 		})
	// 	}, 2000)
	// 	setTimeout(() => {
	// 		this.setState({
	// 			nextHtmlBotComp: (<GenerateBotHTML data={{
	// 				"message":{
	// 					"payload": {
	// 				    "attachment":{
	// 				      "type":"file",
	// 				      "payload":{
	// 				        "url":"https://image.freepik.com/free-photo/cute-cat-picture_1122-449.jpg",
	// 				        "is_reusable":true
	// 				      }
	// 				    }
	// 					}
	// 			  }
	// 			}} />)
	// 		})
	// 	}, 3000)
	// 	setTimeout(() => {
	// 		this.setState({
	// 			nextHtmlBotComp: (<GenerateBotHTML data={{
	// 				"message":{
	// 					"payload": {
	// 				    "attachment":{
	// 				      "type":"audio",
	// 				      "payload":{
	// 				        "url":"http://www.obamadownloads.com/mp3s/dnc-2004-speech.mp3",
	// 				        "is_reusable":true
	// 				      }
	// 				    }
	// 					}
	// 			  }
	// 			}} />)
	// 		})
	// 	}, 4000)
	// 	setTimeout(() => {
	// 		this.setState({
	// 			nextHtmlBotComp: (<GenerateBotHTML data={{
	// 				"message":{
	// 					"text": "Here is a quick reply! Please select an option.",
	// 					"payload": {
	// 				    "quick_replies":[
	// 				      {
	// 				        "content_type":"text",
	// 				        "title":"Option 1",
	// 				        "payload":"<POSTBACK_PAYLOAD>",
	// 				        "image_url":"https://cdn.shopify.com/s/files/1/0367/6021/products/Butterfly_Detail_1_1024x1024.jpg?v=1521724181"
	// 				      },
	// 				      {
	// 				        "content_type":"user_phone_number"
	// 				      },
	// 				      {
	// 				        "content_type":"user_email"
	// 				      },
	// 				      {
	// 				        "content_type":"location"
	// 				      },
	// 				    ]
	// 					}
	// 			  }
	// 			}} />)
	// 		})
	// 	}, 5000)
	// }

	initializeAdAndDialogflow(identityId) {
		// console.log('initializeAdAndDialogflow')
		getAdvertisement(this.props.ad_id)
		.then((data) => {
			// console.log(data)
			return this.props.saveAdToRedux(data)
		})
		.then(() => {
			return getRepForProperty(this.props.ad_id)
		})
		.then((data) => {
			return this.props.saveBotToRedux(data)
		})
		.then(() => {
			// console.log(this.props.representative)
			// console.log(this.props.identityId)
			// console.log('initiateDialogFlow: ', identityId, this.props.representative.bot_id)
			this.initiateDialogFlow(identityId, this.props.representative.bot_id)
		})
		.catch((err) => {
			console.log(err)
		})
	}

	initiateDialogFlow(identityId, botId) {
		// console.log('INITIATING DIALOGFLOW!!!!!')
		// console.log(identityId)
		// console.log(this.props.representative.bot_id)
		const session_id = localStorage.getItem('session_id')
		console.log(`Session ID: ${session_id}`)
		initDialogFlow(session_id, this.props.ad_id, identityId, botId)
			.then((msg) => {
				console.log(msg)
				this.props.initializeFirebaseNotifications()
				this.setState({
					session_id: msg.session_id,
					nextHtmlBotComp: (<GenerateBotHTML
															data={{ message: { ...msg, text: msg.message } }}
															onSubmit={(t) => this.submitted(t)}
															initQualify={() => this.initiateQualification()}
															executeDialogFlowEvent={(event_name) => this.executeDialogFlowEvent(event_name)}
														/>),
					nextHtmlInput: (<GenerateInput
														data={{ message: { ...msg, text: msg.message } }}
														onSubmit={(t) => this.submitted(t)}
													/>),
					messageID: msg.id,
					loading: false,
				})
				this.props.saveSessionIdToRedux(msg.session_id)
			}).catch((err) => {
				console.log(err)
			})
	}

	scrollDown() {
		this.setState({
			scroll: uuid.v4()
		})
	}

	getRepresentativeForAd() {
		getRepForProperty(this.props.ad_id)
			.then((data) => {
				// console.log(data)
				this.props.saveBotToRedux(data)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	listenFCM() {
		firebase.messaging().onMessage((payload) => {
			console.log('Message received. ', payload)
			const msg = {
				...payload.notification,
				message: payload.notification.body,
			}
			// console.log(msg)
			this.setState({
				session_id: msg.session_id,
				nextHtmlBotComp: (<GenerateBotHTML
														data={{ message: { ...msg, text: msg.message } }}
														initQualify={() => this.initiateQualification()}
														scrollDown={() => this.scrollDown()}
														requestedTour={(tour_id) => this.requestedTour(tour_id)}
													/>),
				nextHtmlInput: (<GenerateInput
													data={{ message: { ...msg, text: msg.message } }}
													onSubmit={(t) => this.submitted(t)}
												/>),
				messageID: payload.data.message_id,
			})
		})
	}

	listenToVisibility() {
		document.onvisibilitychange = () => {
			console.log('VISIBILITY CHANGED!')
			if (!document.hidden) {
				// console.log('getting most recent messages....')
			}
		}
	}

	submitted(text) {
		// console.log(text)
		this.setState({
			nextHtmlUserComp: (<UserResponse text={text} />),
		})
		// Promise.resolve() represents some API call
		sendMessageToDialogFlow(text, this.props.session_id, this.props.ad_id, this.props.representative.bot_id, this.props.identityId)
			.then((msg) => {
				console.log(msg)
				this.feedInObserver.next({
					nextHtmlUserComp: null,
					nextHtmlBotComp: (<GenerateBotHTML
															data={{ message: { ...msg, text: msg.message } }}
															onDone={() => this.nextHtmlBotCompDoneEvent()}
															onQualified={() => this.completedQualification()}
															initQualify={() => this.initiateQualification()}
															scrollDown={() => this.scrollDown()}
															requestedTour={(tour_id) => this.requestedTour(tour_id)}
														/>),
					nextHtmlInput: (<GenerateInput
														data={{ message: { ...msg, text: msg.message } }}
														onSubmit={(t) => this.submitted(t)}
													/>),
					messageID: msg.id,
				})
			})
			.catch((err) => {
				console.log(err)
			})
	}

	initiateQualification() {
		// console.log('initiateQualification')
		this.props.setInputStateInRedux({
			show_input: true,
			input_placeholder: 'Ask me more questions!',
		})
		dialogFlowInitQualification(this.props.session_id, this.props.ad_id, this.props.identityId, this.props.representative.bot_id)
			.then((msg) => {
				console.log(msg)
				this.feedInObserver.next({
					nextHtmlUserComp: null,
					nextHtmlBotComp: (<GenerateBotHTML
															data={{ message: { ...msg, text: msg.message } }}
															onQualified={() => this.completedQualification()}
															scrollDown={() => this.scrollDown()}
															requestedTour={(tour_id) => this.requestedTour(tour_id)}
														/>),
					nextHtmlInput: (<GenerateInput
														data={{ message: { ...msg, text: msg.message } }}
														onSubmit={(t) => this.submitted(t)}
													/>),
					messageID: msg.id,
				})
			})
			.catch((err) => {
				console.log(err)
			})
	}

	nextHtmlBotCompDoneEvent() {
		console.log('nextHtmlBotCompDoneEvent()')
	}

	completedQualification() {
		this.props.setInputStateInRedux({
			show_input: true,
			input_placeholder: 'Ask me more questions!',
		})
		dialogFlowExecuteEvent('completed-qualification-answers', this.props.session_id, this.props.ad_id, this.props.identityId, this.props.representative.bot_id)
			.then((msg) => {
				this.feedInObserver.next({
					nextHtmlUserComp: null,
					nextHtmlBotComp: (<GenerateBotHTML
															data={{ message: { ...msg, text: msg.message } }}
															scrollDown={() => this.scrollDown()}
															requestedTour={(tour_id) => this.requestedTour(tour_id)}
														/>),
					nextHtmlInput: (<GenerateInput
															data={{ message: { ...msg, text: msg.message } }}
															onSubmit={(t) => this.submitted(t)}
													/>),
					messageID: msg.id,
				})
			})
			.catch((err) => {
				console.log(err)
			})
	}

	executeDialogFlowEvent(event_name) {
		dialogFlowExecuteEvent(event_name, this.props.session_id, this.props.ad_id, this.props.identityId, this.props.representative.bot_id)
			.then((msg) => {
				this.feedInObserver.next({
					nextHtmlUserComp: null,
					nextHtmlBotComp: (<GenerateBotHTML
															data={{ message: { ...msg, text: msg.message } }}
															scrollDown={() => this.scrollDown()}
															requestedTour={(tour_id) => this.requestedTour(tour_id)}
														/>),
					nextHtmlInput: (<GenerateInput
															data={{ message: { ...msg, text: msg.message } }}
															onSubmit={(t) => this.submitted(t)}
													/>),
					messageID: msg.id,
				})
			})
			.catch((err) => {
				console.log(err)
			})
	}

	requestedTour(tour_id) {
		console.log('requestedTour: ', tour_id)
		this.props.setInputStateInRedux({
			show_input: true,
			input_placeholder: 'Ask me more questions!',
		})
		dialogFlowExecuteEvent('tour-requested', this.props.session_id, this.props.ad_id, this.props.identityId, this.props.representative.bot_id, tour_id)
			.then((msg) => {
				console.log(msg)
				this.feedInObserver.next({
					nextHtmlUserComp: null,
					nextHtmlBotComp: (<GenerateBotHTML
															data={{ message: { ...msg, text: msg.message } }}
														/>),
					nextHtmlInput: (<GenerateInput
															data={{ message: { ...msg, text: msg.message } }}
															onSubmit={(t) => this.submitted(t)}
													/>),
					messageID: msg.id,
				})
			})
			.catch((err) => {
				console.log(err)
			})
	}

	render() {
		if (this.state.loading) {
			return (
				<div id='ConvoUI' style={comStyles().loadingContainer}>
					<Spin />
				</div>
			)
		} else {
			return (
				<div id='ConvoUI' style={comStyles().container}>
					<AIUX
						htmlBotComp={this.state.nextHtmlBotComp}
						htmlUserComp={this.state.nextHtmlUserComp}
						htmlInput={this.state.nextHtmlInput}
						scroll={this.state.scroll}
						messageID={this.state.messageID}
					/>
				</div>
			)
		}
	}
}

// defines the types of variables in this.props
ConvoUI.propTypes = {
	history: PropTypes.object.isRequired,
	ad_id: PropTypes.string.isRequired,
	initializeFirebaseNotifications: PropTypes.func.isRequired,
	saveAdToRedux: PropTypes.func.isRequired,
	saveBotToRedux: PropTypes.func.isRequired,
	saveSessionIdToRedux: PropTypes.func.isRequired,
	identityId: PropTypes.string.isRequired,
	representative: PropTypes.object.isRequired,
	session_id: PropTypes.string.isRequired,
	setInputStateInRedux: PropTypes.func.isRequired,
}

// for all optional props, define a default value
ConvoUI.defaultProps = {
	ad_id: 'd5cd68d9-fcc4-4abf-84e7-b0c52a8d9dbb'
}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(ConvoUI)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {
		identityId: redux.auth.identityId,
		representative: redux.advertisements.representative,
		session_id: redux.auth.session_id,
	}
}

// Connect together the Redux store with this React component
export default withRouter(
	connect(mapReduxToProps, {
		initializeFirebaseNotifications,
		saveAdToRedux,
		saveBotToRedux,
		saveSessionIdToRedux,
		setInputStateInRedux,
	})(RadiumHOC)
)

// ===============================

// the JS function that returns Radium JS styling
const comStyles = () => {
	return {
		container: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      width: '100vw',
      justifyContent: 'center',
      alignItems: 'center',
		},
		loadingContainer: {
			height: '100vh',
			width: '100vw',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center'
		},
	}
}
