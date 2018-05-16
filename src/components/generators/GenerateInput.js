// Compt for copying as a GenerateInput
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import InputMachine from '../modules/InputMachine'
import {
  Button,
  Icon,
} from 'antd'


class GenerateInput extends Component {

  generateHTML() {
    if (this.props.data.message) {
      return (
        <InputMachine onSubmit={(text) => this.props.onSubmit(text)} style={{ width: '100%', marginLeft: '10px', }} />
      )
    } else {
      return (
        <InputMachine onSubmit={(text) => this.props.onSubmit(text)} style={{ width: '100%', marginLeft: '10px', }} />
      )
    }
  }

	render() {
		return (
			<div id='GenerateInput' style={comStyles().container}>
        <Button type='default' shape='circle' style={{ backgroundColor: '#f85032' }} size='large' onClick={() => this.props.onSubmit(`I'm interested in the property`)}>
          <Icon type='heart' style={{ color: 'white' }} />
        </Button>
				{this.generateHTML()}
			</div>
		)
	}
}

// defines the types of variables in this.props
GenerateInput.propTypes = {
	history: PropTypes.object.isRequired,
  data: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
}

// for all optional props, define a default value
GenerateInput.defaultProps = {
  data: {}
}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(GenerateInput)

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
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
		}
	}
}
