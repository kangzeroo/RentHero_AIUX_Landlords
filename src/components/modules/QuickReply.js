// Compt for copying as a QuickReply
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd-mobile'
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
        OPTIONS:
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
          speed={0.4}
          text={this.props.data.message.text}
          textStyles={{
            color: 'black',
            textAlign: 'left',
          }}
          containerStyles={{
            width: '100%',
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
      backgroundColor: 'green',
      margin: '10px auto',
    }
	}
}
