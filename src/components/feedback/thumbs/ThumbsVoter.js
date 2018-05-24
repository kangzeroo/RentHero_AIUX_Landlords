// Compt for copying as a ThumbsVoter
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd-mobile'
import ThumbsUp from './ThumbsUp'
import ThumbsDown from './ThumbsDown'
import { saveUserReaction } from '../../../api/feedback/feedback_api'


class ThumbsVoter extends Component {

  clickedThumb(bool) {
    const x = this.props.messageID || 'missing_message_id'
    console.log(x)
    saveUserReaction({
      message_id: this.props.messageID || 'missing_message_id',
      reaction: bool ? 'thumbsup' : 'thumbsdown',
      ad_id: this.props.ad_id,
      session_id: this.props.session_id,
      identity_id: this.props.identity_id,
    }).then((data) => {
      console.log(data)
    }).catch((err) => {
      console.log(err)
    })
  }

	render() {
		return (
      <div id='ThumbsVoter' style={thumbStyles().container}>
        <ThumbsUp messageID={this.props.messageID} clickedThumb={(bool) => this.clickedThumb(bool)} />
        <ThumbsDown messageID={this.props.messageID} clickedThumb={(bool) => this.clickedThumb(bool)} />
      </div>
		)
	}
}

// defines the types of variables in this.props
ThumbsVoter.propTypes = {
	history: PropTypes.object.isRequired,
  messageID: PropTypes.string.isRequired,   // passed in
  session_id: PropTypes.string.isRequired,
  identity_id: PropTypes.string.isRequired,
  ad_id: PropTypes.string.isRequired,
}

// for all optional props, define a default value
ThumbsVoter.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(ThumbsVoter)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {
    session_id: redux.auth.session_id,
    identity_id: redux.auth.identityId,
    ad_id: redux.advertisements.current_ad.ad_id
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
		}
	}
}


const thumbStyles = () => {
  const thumb = {
    opacity: 0.5,
    cursor: 'pointer',
    height: '25px',
    width: 'auto',
    margin: '5px',
    ':hover': {
      opacity: 0.8,
      WebkitFilter: 'brightness(200%)',
      WebkitTransition: 'all 1s ease',
      MozTransition: 'all 1s ease',
      OTransition: 'all 1s ease',
      MsTransition: 'all 1s ease',
      transition: 'all 1s ease',
    }
  }
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    up: {
      ...thumb,
    },
    down: {
      ...thumb,
      MozTransform: 'scaleX(-1)',
      OTransform: 'scaleX(-1)',
      WebkitTransform: 'scaleX(-1)',
      transform: 'scaleX(-1)',
      filter: 'FlipH',
      MsFilter: 'FlipH',
    }
  }
}
