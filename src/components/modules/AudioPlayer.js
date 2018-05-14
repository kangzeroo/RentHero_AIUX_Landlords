// Compt for copying as a AudioPlayer
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd-mobile'


class AudioPlayer extends Component {

	render() {
		return (
			<div id='AudioPlayer' style={comStyles().container}>
        <audio controls>
          <source src={this.props.audioUrl} type='audio/mpeg' />
        </audio>
			</div>
		)
	}
}

// defines the types of variables in this.props
AudioPlayer.propTypes = {
	history: PropTypes.object.isRequired,
  audioUrl: PropTypes.string.isRequired,
}

// for all optional props, define a default value
AudioPlayer.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(AudioPlayer)

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
