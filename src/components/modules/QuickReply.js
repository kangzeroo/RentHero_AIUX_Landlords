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
} from 'antd'
import ImageCarousel from './ImageCarousel'
import SubtitlesMachine from './SubtitlesMachine'

class QuickReply extends Component {

  constructor() {
    super()
    this.state = {
      textLoaded: false,
    }
  }

  componentWillMount() {
    console.log(this.props.data)
    console.log(this.props.data.message.text)
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
            } else if (qr.content_type === 'user_phone_number') {
              return (
                <div key={i} style={comStyles().quickreply}>
                  <h3>Enter Phone Number</h3>
                </div>
              )
            } else if (qr.content_type === 'user_email') {
              return (
                <div key={i} style={comStyles().quickreply}>
                  <h3>Enter Email</h3>
                </div>
              )
            } else if (qr.content_type === 'friendly_name') {
              return (
                <div key={i} style={comStyles().quickreply}>
                  <p>{ qr.title }</p>
                  <Input
                    placeholder='Enter Friendly Name'
                  />
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
                  <List>
                    <Button style={comStyles().selectButton} type='default' size='large'>I have a question about the property</Button>
                    <Button style={comStyles().selectButton} type='default' size='large'>I want to book a tour!</Button>
                    <Button style={comStyles().selectButton} type='default' size='large'>Other</Button>
                  </List>
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
        <SubtitlesMachine
          speed={0.1}
          text={this.props.data.message.text}
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
        {
          this.state.textLoaded
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
}

// for all optional props, define a default value
QuickReply.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(QuickReply)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {

	}
}

// Connect together the Redux store with this React component
export default withRouter(
	connect(mapReduxToProps, {

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
