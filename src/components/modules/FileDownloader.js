// Compt for copying as a FileDownloader
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd-mobile'


class FileDownloader extends Component {

	render() {
		return (
			<div id='FileDownloader' style={comStyles().container}>
				<a href={this.props.src} target='_blank'>Click here to download</a>
			</div>
		)
	}
}

// defines the types of variables in this.props
FileDownloader.propTypes = {
	history: PropTypes.object.isRequired,
  src: PropTypes.string.isRequired,
}

// for all optional props, define a default value
FileDownloader.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(FileDownloader)

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
      backgroundColor: 'yellow',
      color: 'white',
      padding: '10px',
		}
	}
}
