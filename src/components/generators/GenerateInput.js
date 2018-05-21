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
  Button,
  Menu,
} from 'antd'
import { showInterest } from '../../actions/app/app_actions'

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

  clickedHeart() {
    this.props.onSubmit(`I'm interested in the property`)
    this.props.showInterest()
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
            style={{ color: 'lightgray', fontWeight: 'bold', fontSize: '1.2rem', position: 'absolute', left: '50px', zIndex: 20 }}
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
          style={comStyles().inputContainer}
        />
        {
          this.state.input_text.length > 0
          ?
          <Button type='primary' onClick={() => this.submitText()} style={{ position: 'absolute', right: '50px', }}>
            SEND
          </Button>
          :
          <div style={{ color: 'lightgray', position: 'absolute', right: '50px', fontSize: '1.2rem' }}>
          {
            this.props.showed_interest
            ?
            null
            :
            <Icon
              type='heart'
              onClick={() => this.clickedHeart()}
            />
          }
          </div>
        }
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
  showed_interest: PropTypes.bool.isRequired,
  showInterest: PropTypes.func.isRequired,
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
    showed_interest: redux.app.showed_interest,
	}
}

// Connect together the Redux store with this React component
export default withRouter(
	connect(mapReduxToProps, {
    showInterest,
	})(RadiumHOC)
)

// ===============================

// the JS function that returns Radium JS styling
const comStyles = (type) => {
  let attrs
  if (type === 'send_button') {
    attrs = {
      padding: '20px 100px 20px 60px',
    }
  } else {
    attrs = {
      padding: '20px 60px 20px 60px',
    }
  }
	return {
		container: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: '10px 20px',
      width: '100%',
		},
    inputContainer: {
      width: '100%',
      borderRadius: '20px',
      border: 'none',
      height: '50px',
      ...attrs,
    }
	}
}
