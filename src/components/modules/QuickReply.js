// Compt for copying as a QuickReply
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {
  Input,
  List,
  Button,
  Divider,
  Card,
  Form,
  Icon,
  message,
} from 'antd'
import ImageCarousel from './ImageCarousel'
import SubtitlesMachine from './SubtitlesMachine'
import { saveFriendlyNameToLeads, updateLeadInfo, } from '../../api/leads/leads_api'
import { setInputStateInRedux } from '../../actions/chat/chat_actions'
import { dialogFlowPropertyQuestion, } from '../../api/dialogflow/dialogflow_api'

class QuickReply extends Component {

  constructor() {
    super()
    this.state = {
      textLoaded: false,

      friendlyName: '',
      pressedEnterName: false,
      savedFriendlyName: false,

      clickedPurpose: false,
      purpose: '',

      // lead profile
      first_name: '',
      last_name: '',
      phone: '',
      email: '',

      contact_incomplete: false,
      saving_contact: false,
      contact_updated: false,
    }
  }

  componentWillMount() {
    console.log('QUICKREPLY MOUNTED')
    console.log(this.props.data)
    console.log(this.props.data.message.text)
    if (this.props.data.message.payload.quick_replies[0].content_type === 'acquire_contact') {
      const contact = this.props.data.message.payload.quick_replies[0]
      this.setState({
        first_name: contact.first_name,
        last_name: contact.last_name,
        phone: contact.phone,
        email: contact.email,
      })
    }
  }

  saveFriendlyName() {
    this.setState({
      pressedEnterName: true,
    }, () => {
      saveFriendlyNameToLeads(this.props.identityId, this.state.friendlyName)
        .then((data) => {
          message.success(data.message)
          this.setState({
            savedFriendlyName: true,
          })
        })
        .catch((err) => {
          console.log(err)
          message.error(err.response.data)
        })
    })
  }

  initiateQuestioning() {
    if (!this.state.clickedPurpose) {
      this.setState({
        clickedPurpose: true,
        purpose: 'question',
      })
      dialogFlowPropertyQuestion(this.props.session_id, this.props.current_ad.ad_id, this.props.identityId, this.props.representative.bot_id)
      this.props.setInputStateInRedux({
        show_input: true,
        input_placeholder: 'Ask me a question!',
      })
    }
  }

  initiateInterest() {
    if (!this.state.clickedPurpose) {
      this.setState({
        clickedPurpose: true,
        purpose: 'interested',
      })
      const msg = `I'm interested in this property!`
      this.props.submitMessage(msg)
    }
  }

  updateContactDetails() {
    const self = this.state
    this.setState({
      contact_incomplete: false,
    })
    if (self.first_name.length > 0 && self.last_name.length > 0 && self.phone.length > 0 && self.email.length > 0) {
      this.setState({
        saving_contact: true,
      })
      updateLeadInfo(this.props.identityId, self.first_name, self.last_name, self.phone, self.email)
        .then((data) => {
          message.success(data.message)
          this.setState({
            contact_updated: true,
            saving_contact: false,
          })
        })
    } else {
      this.setState({
        contact_incomplete: true,
        saving_contact: false,
      })
    }
  }

  renderPurposeSelectionlist() {
    return (
      <List>
        <Button
          style={comStyles().selectButton}
          type='default'
          size='large'
          onClick={() => this.initiateQuestioning()}
          disabled={this.state.clickedPurpose && this.state.purpose !== 'question'}
          >I have a question about the property</Button>
        <Button
          style={comStyles().selectButton}
          type='default'
          size='large'
          onClick={() => this.initiateInterest()}
          disabled={this.state.clickedPurpose && this.state.purpose !== 'interested'}
          >I want to book a tour!</Button>
        <Button
          style={comStyles().selectButton}
          type='default'
          size='large'
          disabled={this.state.clickedPurpose && this.state.purpose !== 'other'}
          >Other</Button>
      </List>
    )
  }

  renderFriendlyNameInput(qr) {
    if (this.state.savedFriendlyName) {
      return (
        <div>
          <p>{`Hello ${this.state.friendlyName}, How can I help you today? :)`}</p>
          {
            this.renderPurposeSelectionlist()
          }
        </div>
      )
    } else {
      return (
        <div>
          <p>{ qr.title }</p>
          <Form>
            <Form.Item
              validateStatus={this.state.friendlyName.length === 0 && this.state.pressedEnterName ? 'error' : null}
              help={this.state.friendlyName.length === 0 && this.state.pressedEnterName ? 'Please enter a name we can call you by' : null}
            >
              <Input
                placeholder='Enter Friendly Name'
                value={this.state.friendlyName}
                onChange={e => this.setState({ friendlyName: e.target.value })}
                onPressEnter={() => this.saveFriendlyName()}
              />
            </Form.Item>
          </Form>
        </div>
      )
    }
  }

  renderAcquireContact(qr) {
    if (this.state.contact_updated) {
      return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: '10px', }}>
          <Icon type='check-circle' style={{ fontSize: '5REM', color: '#00FF00' }} />
          <br />
          <div>Your contact details have been updated</div>
        </div>
      )
    } else {
      return (
        <div>
          <p>{ qr.title }</p>
          <Form layout='vertical'>
            <Form.Item
              validateStatus={this.state.first_name.length === 0 && this.state.contact_incomplete ? 'error' : null}
              help={this.state.first_name.length === 0 && this.state.contact_incomplete ? 'Please enter a first name' : null}
            >
              <Input
                placeholder='First Name'
                prefix={<Icon type='user' />}
                value={this.state.first_name}
                disabled={this.state.saving_contact}
                onChange={e => this.setState({ first_name: e.target.value })}
              />
            </Form.Item>
            <Form.Item
            validateStatus={this.state.last_name.length === 0 && this.state.contact_incomplete ? 'error' : null}
            help={this.state.last_name.length === 0 && this.state.contact_incomplete ? 'Please enter a last name' : null}
            >
              <Input
                placeholder='Last Name'
                prefix={<Icon type='user' />}
                value={this.state.last_name}
                disabled={this.state.saving_contact}
                onChange={e => this.setState({ last_name: e.target.value })}
              />
            </Form.Item>
            <Form.Item
            validateStatus={this.state.phone.length === 0 && this.state.contact_incomplete ? 'error' : null}
            help={this.state.phone.length === 0 && this.state.contact_incomplete ? 'Please enter a phone number' : null}
            >
              <Input
                placeholder='Phone Number'
                prefix={<Icon type='phone' />}
                value={this.state.phone}
                disabled={this.state.saving_contact}
                onChange={e => this.setState({ phone: e.target.value })}
              />
            </Form.Item>
            <Form.Item
            validateStatus={this.state.email.length === 0 && this.state.contact_incomplete ? 'error' : null}
            help={this.state.email.length === 0 && this.state.contact_incomplete ? 'Please enter an email address' : null}
            >
              <Input
                placeholder='Email Address'
                prefix={<Icon type='mail' />}
                value={this.state.email}
                disabled={this.state.saving_contact}
                onChange={e => this.setState({ email: e.target.value })}
                onPressEnter={() => this.updateContactDetails()}
              />
            </Form.Item>
            <Form.Item>
              <Button type='primary' onClick={() => this.updateContactDetails()} loading={this.state.saving_contact} disabled={this.state.saving_contact}>
                SAVE
              </Button>
            </Form.Item>
          </Form>
        </div>
      )
    }
  }

  renderQuickReplyOptions() {
    return (
      <div>
        {
          this.props.data.message.payload.quick_replies.map((qr, i) => {
            if (qr.content_type === 'location') {
              return (
                <div key={i} style={comStyles().quickreply}>
                  <h3>Send Location</h3>
                </div>
              )
            } else if (qr.content_type === 'acquire_contact') {
              return (
                <div key={i} style={comStyles().quickreply}>
                  {
                    this.renderAcquireContact(qr)
                  }
                </div>
              )
            } else if (qr.content_type === 'friendly_name') {
              return (
                <div key={i} style={comStyles().quickreply}>
                  {
                    this.renderFriendlyNameInput(qr)
                  }
                </div>
              )
            } else if (qr.content_type === 'text') {
              return (
                <div key={i} style={comStyles().quickreply}>
                  <h3>{qr.title}</h3>
                  {
                    qr.image_url
                    ?
                    <ImageCarousel imageUrl={qr.image_url} />
                    :
                    null
                  }
                </div>
              )
            } else if (qr.content_type === 'purpose_selection') {
              return (
                <div key={i} style={comStyles().quickreply}>
                  <p>{ qr.title }</p>
                  {
                    this.renderPurposeSelectionlist()
                  }
                </div>
              )
            }
          })
        }
      </div>
    )
  }

	render() {
		return (
			<div id='QuickReply' style={comStyles().container}>
        {
          this.props.data.message.message.length > 0
          ?
          <SubtitlesMachine
            speed={0.1}
            text={this.props.data.message.message}
            textStyles={{
              color: 'black',
              textAlign: 'left',
            }}
            containerStyles={{
              width: '100%',
              backgroundColor: 'aliceblue',
              borderRadius: '10px',
              padding: '10px',
              margin: '5px 0px',
            }}
            doneEvent={() => {
              console.log('WOOOO')
              this.setState({
                textLoaded: true
              })
            }}
          />
          :
          null
        }
        {
          this.state.textLoaded || this.props.data.message.message.length === 0
          ?
          this.renderQuickReplyOptions()
          :
          null
        }
			</div>
		)
	}
}

// defines the types of variables in this.props
QuickReply.propTypes = {
	history: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  identityId: PropTypes.string.isRequired,
  setInputStateInRedux: PropTypes.func.isRequired,
  current_ad: PropTypes.object.isRequired,
  session_id: PropTypes.string.isRequired,
  representative: PropTypes.object.isRequired,
  submitMessage: PropTypes.func,           // passed in
}

// for all optional props, define a default value
QuickReply.defaultProps = {
  onSubmit: () => {},
}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(QuickReply)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {
    identityId: redux.auth.identityId,
    current_ad: redux.advertisements.current_ad,
    session_id: redux.auth.session_id,
    representative: redux.advertisements.representative,
	}
}

// Connect together the Redux store with this React component
export default withRouter(
	connect(mapReduxToProps, {
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
		},
    quickreply: {
      backgroundColor: 'aliceblue',
      padding: '10px',
      borderRadius: '10px',
      margin: '5px 0px'
    },
    selectButton: {
      width: '100%',
    }
	}
}
