// Compt for copying as a GenerateInput
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
  Icon,
  message,
  Dropdown,
  Menu,
} from 'antd'


class GenerateInput extends Component {

  constructor() {
    super()
    this.state = {
      input_text: '',
      input_id: uuid.v4(),
    }
  }

  submitText() {
    if (this.state.input_text.length > 0) {
      this.props.onSubmit(this.state.input_text)
      this.setState({ input_text: '' })
    } else {
      message.error('Please input something...')
    }
  }

	render() {
    const menu_items = [
      `What's the address of the property?`,
      `Show me some pictures`,
      `When can i move in?`
    ]
    const menu = (
      <Menu onClick={a => this.props.onSubmit(a.item.props.children)}>
        <Menu.Item>
          {menu_items[0]}
        </Menu.Item>
        <Menu.Item>
          {menu_items[1]}
        </Menu.Item>
        <Menu.Item>
          {menu_items[2]}
        </Menu.Item>
      </Menu>
    )
		return (
			<div id='GenerateInput' style={comStyles().container}>
        <Dropdown overlay={menu} placement='topLeft' trigger={['click']}>
          <Icon
            type='plus'
            style={{ color: 'lightgray', fontWeight: 'bold', fontSize: '1.2rem', position: 'absolute', left: '50px', zIndex: 99999 }}
          />
        </Dropdown>
        <Input
          id={`input_field_${this.state.input_id}`}
          value={this.state.input_text}
          onChange={(e) => this.setState({
            input_text: e.target.value
          })}
          placeholder={this.props.input.input_placeholder}
          onPressEnter={() => this.submitText()}
          size='large'
          style={{ width: '100%', borderRadius: '20px', padding: '20px 20px 20px 60px', border: 'none', background: 'aliceblue' }}
        />
        <Icon
          type='heart'
          style={{ color: 'lightgray', position: 'absolute', right: '50px', fontSize: '1.2rem' }}
          onClick={() => this.props.onSubmit(`I'm interested in the property`)}
        />
			</div>
		)
	}
}

// defines the types of variables in this.props
GenerateInput.propTypes = {
	history: PropTypes.object.isRequired,
  data: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  input: PropTypes.object.isRequired,
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
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '10px 20px',
      width: '100%',
		}
	}
}
