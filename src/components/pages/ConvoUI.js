// Compt for copying as a ConvoUI
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd-mobile'
import SubtitlesMachine from '../modules/SubtitlesMachine'


class ConvoUI extends Component {

	render() {
		return (
			<div id='ConvoUI' style={comStyles().container}>
        <SubtitlesMachine
          speed={0.4}
          text={`I am RentHero, your virtual rental assistant. If you have any questions, just ask me!`}
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
          }}
        />
			</div>
		)
	}
}

// defines the types of variables in this.props
ConvoUI.propTypes = {
	history: PropTypes.object.isRequired,
}

// for all optional props, define a default value
ConvoUI.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(ConvoUI)

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
      height: '100vh',
      width: '100vw',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#56CCF2',  /* fallback for old browsers */
			background: '-webkit-linear-gradient(to right, #2F80ED, #56CCF2)',  /* Chrome 10-25, Safari 5.1-6 */
			background: 'linear-gradient(to right, #2F80ED, #56CCF2)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
		},
	}
}
