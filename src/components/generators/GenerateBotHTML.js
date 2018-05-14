// Compt for copying as a GenerateBotHTML
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import SubtitlesMachine from '../modules/SubtitlesMachine'
import {

} from 'antd-mobile'


class GenerateBotHTML extends Component {

  generateHTML() {
    console.log(this.props.data)
    if (this.props.data.message) {
      return (
        <SubtitlesMachine
        	speed={0.4}
        	text={this.props.data.message}
        	textStyles={{
        		fontSize: '1.3rem',
        		color: 'white',
        		textAlign: 'left',
        	}}
        	containerStyles={{
        		width: '70%',
        	}}
        	doneEvent={() => {
        		console.log('DONE')
            this.props.onDone()
        	}}
        />
      )
    } else {
      return (
        <div>Unsupported Message Type</div>
      )
    }
  }

	render() {
		return (
			<div id='GenerateBotHTML' style={comStyles().container}>
				{this.generateHTML()}
			</div>
		)
	}
}

// defines the types of variables in this.props
GenerateBotHTML.propTypes = {
	history: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  onDone: PropTypes.func,
}

// for all optional props, define a default value
GenerateBotHTML.defaultProps = {
  onDone: () => {}
}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(GenerateBotHTML)

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
