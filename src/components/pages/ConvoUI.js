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

} from 'antd-mobile'
import { initDialogFlow, sendMessageToDialogFlow } from '../../api/dialogflow/dialogflow_api'
import { initializeFirebaseNotifications, addChatHistory } from '../../actions/firebase/firebase_cloud_messaging_actions'
import { getMostRecentChat } from '../../api/fcm/firebase_cloud_messaging'
import UserResponse from '../modules/UserResponse'
import GenerateBotHTML from '../generators/GenerateBotHTML'
import GenerateInput from '../generators/GenerateInput'
import AIUX from './AIUX'

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
		this.initiateDialogFlow()
		this.listenFCM()
		this.listenToVisibility()
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
	}

	initiateDialogFlow() {
		initDialogFlow(this.props.ad_id)
			.then((msg) => {
				this.props.initializeFirebaseNotifications()
				this.setState({
					session_id: msg.session_id,
					nextHtmlBotComp: (<GenerateBotHTML data={msg} />),
					nextHtmlInput: (<GenerateInput onSubmit={(t) => this.submitted(t)} />),
				})
			}).catch((err) => {
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
			this.setState({
				session_id: msg.session_id,
				nextHtmlBotComp: (<GenerateBotHTML data={msg} />),
				nextHtmlInput: (<GenerateInput onSubmit={(t) => this.submitted(t)} />),
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
		// Promise.resolve() represents some API call
		sendMessageToDialogFlow(text, this.state.session_id, this.props.ad_id)
			.then((msg) => {
				this.feedInObserver.next({
					nextHtmlUserComp: (<UserResponse text={text} />),
					nextHtmlBotComp: (<GenerateBotHTML data={msg} onDone={() => this.nextHtmlBotCompDoneEvent()} />),
					nextHtmlInput: (<GenerateInput data={msg} onSubmit={(t) => this.submitted(t)} />),
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

	}
}

// Connect together the Redux store with this React component
export default withRouter(
	connect(mapReduxToProps, {
		initializeFirebaseNotifications,
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
