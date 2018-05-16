// Compt for copying as a template
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {
  Input,
  Form,
  Button,
  message,
} from 'antd'
import SubtitlesMachine from './SubtitlesMachine'
import { saveQualificationAnswer } from '../../api/leads/leads_api'

class Questions extends Component {

  constructor() {
    super()
    this.state = {
      textLoaded: false,

      visibleIndex: 1,

      answers: ['', '', ''],
    }
  }

  componentWillMount() {
    console.log('QUESTIONSSSSS')
  }

  saveAnswerAndMoveOn(question, index) {
    if (index < this.props.data.message.payload.questions.length) {
      saveQualificationAnswer(this.props.identityId, question.question_id, this.state.answers[index - 1])
        .then((data) => {
          message.success(data.message)
          this.setState({
            visibleIndex: index + 1,
          })
        })
    } else {
      saveQualificationAnswer(this.props.identityId, question.question_id, this.state.answers[index - 1])
        .then((data) => {
          message.success(data.message)
          this.props.onDone()
        })
    }
  }

  renderQuestions() {
    return (
      <div>
        {
          this.props.data.message.payload.questions.slice(0, this.state.visibleIndex).map((question, index) => {
            const handleChange = (e, index) => {
              const ans = this.state.answers
              ans[index] = e.target.value

              this.setState({
                answers: ans,
              })
            }
            return (
              <div key={index} style={comStyles().quickreply}>
                <p>{`Question #${index + 1}`}</p>
                <Form layout='inline'>
                  <Form.Item label={question.question}>
                    <Input
                      value={this.state.answers[index]}
                      onChange={(e) => handleChange(e, index)}
                      placeholder='Enter your answer here.'
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type='primary'
                      onClick={() => this.saveAnswerAndMoveOn(question, index + 1)}
                    >
                      SAVE
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            )
          })
        }
      </div>
    )
  }

	render() {
		return (
			<div id='Questions' style={comStyles().container}>
        {
          this.props.data.message.message.length > 0
          ?
          <SubtitlesMachine
            speed={0.1}
            text={this.props.data.message.message}
            textStyles={{
              color: 'black',
              textAlign: 'left',
            }}
            containerStyles={{
              width: '100%',
              backgroundColor: 'aliceblue',
              borderRadius: '10px',
              padding: '10px',
              margin: '5px 0px',
            }}
            doneEvent={() => {
              console.log('WOOOO')
              this.setState({
                textLoaded: true
              })
            }}
          />
          :
          null
        }
        {
          this.state.textLoaded || this.props.data.message.message.length === 0
          ?
          this.renderQuestions()
          :
          null
        }
			</div>
		)
	}
}

// defines the types of variables in this.props
Questions.propTypes = {
	history: PropTypes.object.isRequired,
  identityId: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,        // passed in
  onDone: PropTypes.func,                   // passed in
}

// for all optional props, define a default value
Questions.defaultProps = {
  onDone: () => {},
}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(Questions)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {
    identityId: redux.auth.identityId,
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
		},
    quickreply: {
      backgroundColor: 'aliceblue',
      padding: '10px',
      borderRadius: '10px',
      margin: '5px 0px'
    },
	}
}
