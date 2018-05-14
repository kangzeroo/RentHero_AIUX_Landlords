// Compt for copying as a template
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd'


class QuickMessage extends Component {

	render() {
		return (
			<div id='QuickMessage' style={comStyles().container}>
				{ this.props.text }
			</div>
		)
	}
}

// defines the types of variables in this.props
QuickMessage.propTypes = {
	history: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,        // passed in
}

// for all optional props, define a default value
QuickMessage.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(QuickMessage)

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
      backgroundColor: 'aliceblue',
      color: 'black',
      padding: '10px',
      borderRadius: '10px',
		}
	}
}
