// Compt for copying as a ConvoUI
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import firebase from 'firebase'
import {

} from 'antd'
import { initDialogFlow, sendMessageToDialogFlow } from '../../api/dialogflow/dialogflow_api'
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

class ConvoUI extends Component {

	constructor() {
		super()
		this.state = {
			session_id: '',
			nextHtmlBotComp: null,
			nextHtmlUserComp: null,
			nextHtmlInput: null,
		}
		this.feedInObserverable = null
		this.feedInObserver = null
	}

	componentDidMount() {
		this.initObservable()
		this.listenFCM()
		this.listenToVisibility()
		this.initializeAdAndDialogflow()
	}

	initObservable() {
		this.feedInObserverable = Rx.Observable.create((obs) => {
			this.feedInObserver = obs
		}).subscribe({
			next: ({ nextHtmlUserComp, nextHtmlBotComp, nextHtmlInput }) => {
	      console.log('OBSERVABLE NEXT')
				this.setState({
					nextHtmlUserComp,
					nextHtmlBotComp,
					nextHtmlInput,
				})
			},
			error: (err) => {
				console.log('OBSERVABLE ERROR')
				console.log(err)
			},
			complete: (y) => {
				console.log('OBSERVABLE COMPLETE')
			}
		})
		// this.test()
	}

	test() {
		this.setState({
			nextHtmlBotComp: (<GenerateBotHTML data={{
				"message":{
					"payload": {
				    "attachment":{
				      "type":"image",
				      "payload":{
				        "url":"https://image.freepik.com/free-photo/cute-cat-picture_1122-449.jpg",
				        "is_reusable":true
				      }
				    }
					}
			  }
			}} />)
		})
		setTimeout(() => {
			this.setState({
				nextHtmlBotComp: (<GenerateBotHTML data={{
					"message":{
						"payload": {
					    "attachment":{
					      "type":"video",
					      "payload":{
					        "url":"https://www.youtube.com/embed/UCmPmkHqHXk",
					        "is_reusable":true
					      }
					    }
						}
				  }
				}} />)
			})
		}, 1000)
		setTimeout(() => {
			this.setState({
				nextHtmlBotComp: (<GenerateBotHTML data={{
					"message":{
						"payload": {
					    "attachment":{
					      "type":"file",
					      "payload":{
					        "url":"https://www.planetebook.com/free-ebooks/a-tale-of-two-cities.pdf",
					        "is_reusable":true
					      }
					    }
						}
				  }
				}} />)
			})
		}, 2000)
		setTimeout(() => {
			this.setState({
				nextHtmlBotComp: (<GenerateBotHTML data={{
					"message":{
						"payload": {
					    "attachment":{
					      "type":"file",
					      "payload":{
					        "url":"https://image.freepik.com/free-photo/cute-cat-picture_1122-449.jpg",
					        "is_reusable":true
					      }
					    }
						}
				  }
				}} />)
			})
		}, 3000)
		setTimeout(() => {
			this.setState({
				nextHtmlBotComp: (<GenerateBotHTML data={{
					"message":{
						"payload": {
					    "attachment":{
					      "type":"audio",
					      "payload":{
					        "url":"http://www.obamadownloads.com/mp3s/dnc-2004-speech.mp3",
					        "is_reusable":true
					      }
					    }
						}
				  }
				}} />)
			})
		}, 4000)
		setTimeout(() => {
			this.setState({
				nextHtmlBotComp: (<GenerateBotHTML data={{
					"message":{
						"text": "Here is a quick reply! Please select an option.",
						"payload": {
					    "quick_replies":[
					      {
					        "content_type":"text",
					        "title":"Option 1",
					        "payload":"<POSTBACK_PAYLOAD>",
					        "image_url":"https://cdn.shopify.com/s/files/1/0367/6021/products/Butterfly_Detail_1_1024x1024.jpg?v=1521724181"
					      },
					      {
					        "content_type":"user_phone_number"
					      },
					      {
					        "content_type":"user_email"
					      },
					      {
					        "content_type":"location"
					      },
					    ]
						}
				  }
				}} />)
			})
		}, 5000)
	}

	initializeAdAndDialogflow() {
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
			this.initiateDialogFlow(this.props.identityId, this.props.representative.bot_id)
		})
		.catch((err) => {
			console.log(err)
		})
	}

	initiateDialogFlow(identityId, botId) {
		console.log('INITIATING DIALOGFLOW!!!!!')
		// console.log(identityId)
		// console.log(this.props.representative.bot_id)
		const session_id = localStorage.getItem('session_id')
		console.log(session_id)
		initDialogFlow(session_id, this.props.ad_id, identityId, botId)
			.then((msg) => {
				console.log(msg)
				this.props.initializeFirebaseNotifications()
				this.setState({
					session_id: msg.session_id,
					nextHtmlBotComp: (<GenerateBotHTML data={{ message: { ...msg, text: msg.message } }} onSubmit={(t) => this.submitted(t)} />),
					nextHtmlInput: (<GenerateInput data={{ message: { ...msg, text: msg.message } }} onSubmit={(t) => this.submitted(t)} />),
				})
				this.props.saveSessionIdToRedux(msg.session_id)
			}).catch((err) => {
				console.log(err)
			})
	}

	getRepresentativeForAd() {
		getRepForProperty(this.props.ad_id)
			.then((data) => {
				console.log(data)
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
				message: payload.notification.body
			}
			console.log(msg)
			this.setState({
				session_id: msg.session_id,
				nextHtmlBotComp: (<GenerateBotHTML data={{ message: { ...msg, text: msg.message } }} />),
				nextHtmlInput: (<GenerateInput data={{ message: { ...msg, text: msg.message } }} onSubmit={(t) => this.submitted(t)} />),
			})
		})
	}

	listenToVisibility() {
		document.onvisibilitychange = () => {
			console.log('VISIBILITY CHANGED!')
			if (!document.hidden) {
				console.log('getting most recent messages....')
			}
		}
	}

	submitted(text) {
		console.log(text)
		this.setState({
			nextHtmlUserComp: (<UserResponse text={text} />),
		})
		// Promise.resolve() represents some API call
		sendMessageToDialogFlow(text, this.props.session_id, this.props.ad_id, this.props.representative.bot_id, this.props.identityId)
			.then((msg) => {
				this.feedInObserver.next({
					nextHtmlUserComp: null,
					nextHtmlBotComp: (<GenerateBotHTML data={{ message: { ...msg, text: msg.message } }} onDone={() => this.nextHtmlBotCompDoneEvent()} />),
					nextHtmlInput: (<GenerateInput data={{ message: { ...msg, text: msg.message } }} onSubmit={(t) => this.submitted(t)} />),
				})
			})
			.catch((err) => {
				console.log(err)
			})
	}

	nextHtmlBotCompDoneEvent() {
		console.log('nextHtmlBotCompDoneEvent()')
	}

	render() {
		return (
			<div id='ConvoUI' style={comStyles().container}>
				<AIUX
					htmlBotComp={this.state.nextHtmlBotComp}
					htmlUserComp={this.state.nextHtmlUserComp}
					htmlInput={this.state.nextHtmlInput}
				/>
			</div>
		)
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
	}
}
