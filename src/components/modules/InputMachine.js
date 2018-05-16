// Compt for copying as a InputMachine
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import uuid from 'uuid'
import { withRouter } from 'react-router-dom'
import {
  Input,
  message,
} from 'antd'


class InputMachine extends Component {

  constructor() {
    super()
    this.state = {
			input_text: '',
      input_id: uuid.v4(),
    }
  }

  // componentDidMount() {
  //   document.getElementById(`input_field_${this.state.input_id}`).addEventListener('keyup', (e) => {
  //     if (e.keyCode === 13) {
  //       this.submitText()
  //     }
  //   })
  // }

  submitText() {
    if (this.state.input_text.length > 0) {
      this.props.onSubmit(this.state.input_text)
      this.setState({ input_text: '' })
    } else {
      message.error('Please input something...')
    }
  }

  // 				<input id={`input_field_${this.state.input_id}`} type='text' value={this.state.input_text} onChange={(e) => this.setState({ input_text: e.target.value })} />
  //         <button onClick={() => this.submitText()}>Send</button>


	render() {
		return (
			<div id='InputMachine' style={comStyles().container}>
        <Input
          id={`input_field_${this.state.input_id}`}
          value={this.state.input_text}
          onChange={(e) => this.setState({
            input_text: e.target.value
          })}
          placeholder={this.props.input.input_placeholder}
          onPressEnter={() => this.submitText()}
          size='large'
          style={{ width: '100%', }}
        />
			</div>
		)
	}
}

// defines the types of variables in this.props
InputMachine.propTypes = {
	history: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,      // passed in
  input: PropTypes.object.isRequired,
}

// for all optional props, define a default value
InputMachine.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(InputMachine)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {
    input: redux.chat.input,
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
      width: '100%',
      marginLeft: '10px'
		}
	}
}
