// Compt for copying as a ImageCarousel
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd-mobile'


class ImageCarousel extends Component {

	render() {
		return (
			<div id='ImageCarousel' style={comStyles().container}>
				<img src={this.props.imageUrl} style={{ width: 'auto', height: '20vh' }} />
			</div>
		)
	}
}

// defines the types of variables in this.props
ImageCarousel.propTypes = {
	history: PropTypes.object.isRequired,
  imageUrl: PropTypes.string.isRequired,    // passed in
}

// for all optional props, define a default value
ImageCarousel.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(ImageCarousel)

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
