// Compt for copying as a VideoPlayer
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd-mobile'


class VideoPlayer extends Component {

	render() {
		return (
			<div id='VideoPlayer' style={comStyles().container}>
        {
          this.props.videoUrl.indexOf('youtube') > -1 || this.props.videoUrl.indexOf('youtu.be') > -1
          ?
          <div style='position:relative;height:0;padding-bottom:41.04%'>
            <iframe width='560' height='315' src={this.props.videoUrl} frameBorder='0' allowFullScreen></iframe>
          </div>
          :
          <video width='320' height='240' controls>
            <source src={this.props.videoUrl} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        }
			</div>
		)
	}
}

// defines the types of variables in this.props
VideoPlayer.propTypes = {
	history: PropTypes.object.isRequired,
  videoUrl: PropTypes.string.isRequired,
}

// for all optional props, define a default value
VideoPlayer.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(VideoPlayer)

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
