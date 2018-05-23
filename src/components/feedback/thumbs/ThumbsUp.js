// Compt for copying as a ThumbsUp
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd-mobile'


class ThumbsUp extends Component {

  constructor() {
    super()
    this.state = {
      clicked: false
    }
  }

  clickedThumb(bool) {
    if (!this.state.clicked) {
      this.props.clickedThumb(bool)
    }
    this.setState({
      clicked: true
    })
  }

	render() {
		return (
      <img
        id='ThumbsUp'
        key={`thumbs_up_${this.props.messageID}`}
        alt='thumbs_up'
        style={thumbStyles(this.state.clicked).up}
        onClick={() => this.clickedThumb(true)}
        src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAH8SURBVGhD7ZkxKIRhGMfvhJBJioXFYJTNaMFAKYkyicEgm5IogwwGpBjEquwsMlNmFsp6UQqDoq7j9933L+ru8Jzje+T71b+vu/d53+f39NV1910iJsYBmUxmi1yRE7JD2rX0N0D47OUdvH4m/Vr2Db5JZB9D9Td4L0WqVeYXJJvknANrvSrzC56doW4uDLCgMr8gOSnfHFjbUZlPcCxH8iLUzYW1XZX6BMEJueaF9T2V+gO/GgRToWp+WN9WuT+Qm5NnQaiZUrkvcKsn91nLD2CANm3xBWKrciwINbdcyrTFD4i1kKdQszDU+PsEwqsSsdNQ8WOoG9E2HyBURw7l9ynU7pHgW2ox2SRDHJNUeztsruWQBtJBFslN1uwXoecRlyop2WDzQXhMtOCxLCUbjga4k5INLwOICml9HUd34FxKNhwNMCwlGx4GwOFIOnYc3YExKdlwNMCllGx4GUD86U+haynZcDTAkpRseBgAh30ulVKyEfUAQX+pFIeDAdKkVTp2oh4gAIdx6djxMACMSsdO1APQP/jd3SwdOw4GmJZKcUQ1AH2PSZ80iifCAUrznwIHDZIZZYNk1ONHoU2PFEoLBw9w/qePE78DPdJcGtWy9HB4PU3WyEO2Y4nh3Hm1+lnoFTyh6yazZJ3kezhlyQrp0vExMTH/h0TiFX4pBE34l4XtAAAAAElFTkSuQmCC`}
      />
		)
	}
}

// defines the types of variables in this.props
ThumbsUp.propTypes = {
	history: PropTypes.object.isRequired,
  messageID: PropTypes.string.isRequired,   // passed in
  clickedThumb: PropTypes.func.isRequired,  // passed in
}

// for all optional props, define a default value
ThumbsUp.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(ThumbsUp)

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
		}
	}
}



const thumbStyles = (clicked) => {
  let opacity = 0.3
  if (clicked) {
    opacity = 1
  }
  const thumb = {
    opacity: opacity,
    cursor: 'pointer',
    height: '25px',
    width: 'auto',
    margin: '5px',
    ':hover': {
      opacity: 1,
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
