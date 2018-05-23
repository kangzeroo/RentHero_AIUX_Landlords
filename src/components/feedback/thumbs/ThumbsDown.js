// Compt for copying as a ThumbsDown
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd-mobile'


class ThumbsDown extends Component {

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
        id='ThumbsDown'
        key={`thumbs_down_${this.props.messageID}`}
        alt='thumbs_down'
        style={thumbStyles(this.state.clicked).down}
        onClick={() => this.clickedThumb(false)}
        src={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAIfSURBVGhD7Zk/S1thFIdTFRWMICIulYIuQicHoVDcgi42ONiv0KGim45CC36AfoHaQQr+WTK4SkSFFgQHAw6lWzt3SWMpyI3P2/ujy80leXNzc89wHzickPe85zxHEq5oIScnJycnU4IgGCNmm83mXIIoql36IDtNbDP0nPybnBj6PBBVXs5pTO9hwAgD3pHr/6amAL1vSUMa2Tto7H7qV+GYdGHOosYmg0aHxC/FH/VPHWatSiEZNDpVz77C3LdSSEZWCziY/YV4KpXuyHIBB/NvSAPS8SfrBRw4LEvHHyMLbEnHHyMLlKXjT9YLMP87aVQ6/hhYoEa8kI4/WS/gwKHR9RIWFnDgUZWSH4YW+Evy/wXP0AL3pCfS6hwrC8CxlPywsAAOP0jPpOSHkQXuSFNS8sPKRwiPT1Lyw9ACdSn5YWiBgDQsrc4xtMC1lPzg4iaxT5wRDfXrK8x9IC1JqXtoNEm8V8O+wKxvREkKvYGGK4R7tLeFunVSq7/CtQ3uzmhk76H5DkPaQt2urtgCt0HkaqFmPNR81RV7IFeWZyzUuO/LhK7YA8HLUDUeatZUbg/kXsozFmr2VG4TBCtybQnnRyq1CYLPidhnA2efVWoXJD/KNwJnByqzC5Kv5RuBsw8qswueC6FuFBbYUJld8CyGulFYYF5ltkH0p5z/w3snOrYPshfyduKOCjGuY/sgWyLeEK/YIb1/lUYoFB4BkoAvfuQTAdEAAAAASUVORK5CYII=`}
      />
		)
	}
}

// defines the types of variables in this.props
ThumbsDown.propTypes = {
	history: PropTypes.object.isRequired,
  messageID: PropTypes.string.isRequired,   // passed in
  clickedThumb: PropTypes.func.isRequired,  // passed in
}

// for all optional props, define a default value
ThumbsDown.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(ThumbsDown)

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
