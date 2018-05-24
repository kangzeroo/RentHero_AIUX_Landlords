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
import { setInputStateInRedux } from '../../actions/chat/chat_actions'

class Questions extends Component {

  constructor() {
    super()
    this.state = {
      textLoaded: false,

      visibleIndex: 1,
      saveIndex: -1,

      answers: ['', '', ''],
    }
  }

  componentWillMount() {
    this.props.setInputStateInRedux({
      show_input: false,
      input_placeholder: 'Ask me a question!',
    })
  }

  componentDidUpdate() {
    this.scrollDown()
    setTimeout(() => {
      this.scrollDown()
    }, 1000)
  }

  scrollDown() {
    console.log('SCROLL DOWN')
    const objDiv = document.getElementById('QuestionsContainer');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

  saveAnswerAndMoveOn(question, index) {
    if (index < this.props.data.message.payload.questions.length) {
      saveQualificationAnswer(this.props.session_id, this.props.identityId, question.question_id, this.state.answers[index - 1])
        .then((data) => {
          message.success(data.message)
          this.setState({
            visibleIndex: index + 1,
            saveIndex: this.state.saveIndex + 1,
          })
          this.props.scrollDown()
        })
    } else {
      saveQualificationAnswer(this.props.session_id, this.props.identityId, question.question_id, this.state.answers[index - 1])
        .then((data) => {
          this.setState({
            saveIndex: this.state.saveIndex + 1,
          })
          message.success(data.message)
          this.props.onQualified()
        })
    }
  }

  renderQuestions() {
    return (
      <div id='QuestionsContainer'>
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
                      onPressEnter={() => this.saveAnswerAndMoveOn(question, index + 1)}
                      disabled={index <= this.state.saveIndex}
                      style={{ borderRadius: '25px' }}
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type='primary'
                      onClick={() => this.saveAnswerAndMoveOn(question, index + 1)}
                      disabled={index <= this.state.saveIndex}
                      style={{ borderRadius: '25px' }}
                    >
                      {
                        index <= this.state.saveIndex
                        ?
                        <div>ANSWERED!</div>
                        :
                        <div>ANSWER</div>
                      }
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
          <SubtitlesMachine
            speed={0.1}
            text={this.props.data.message.payload.message}
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

        {
          this.state.textLoaded
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
  setInputStateInRedux: PropTypes.func.isRequired,
  session_id: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,        // passed in
  onQualified: PropTypes.func,                   // passed in
  scrollDown: PropTypes.func,               // passed in
}

// for all optional props, define a default value
Questions.defaultProps = {
  onQualified: () => {},
  scrollDown: () => {},
}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(Questions)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {
    identityId: redux.auth.identityId,
    session_id: redux.auth.session_id,
	}
}

// Connect together the Redux store with this React component
export default withRouter(
	connect(mapReduxToProps, {
    setInputStateInRedux,
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
      padding: '20px',
      borderRadius: '20px',
      margin: '15px 0px',
      width: '90%',
    },
	}
}
