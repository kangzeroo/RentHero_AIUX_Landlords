// Compt for copying as a AIUX
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import uuid from 'uuid'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {
  Rate,
  Avatar,
  Input,
  List,
  Button,
} from 'antd'


class AIUX extends Component {

  constructor() {
    super()
    this.htmlHistory = []
    this.state = {
      input_style: 'input',
    }
  }

  componentWillMount() {
    if (this.props.htmlBotComp) {
      // console.log(htmlBotComp)
      this.htmlHistory.push({
        id: uuid.v4(),
        sender: 'ai',
        com: this.props.htmlBotComp
      })
    }
  }

  componentWillUpdate(prevProps, prevState) {
    if (prevProps.htmlUserComp !== this.props.htmlUserComp) {
      if (prevProps.htmlUserComp) {
        // ensure com is not null
        this.htmlHistory.push({
          id: uuid.v4(),
          sender: 'user',
          com: prevProps.htmlUserComp
        })
      }
    }
    if (prevProps.htmlBotComp !== this.props.htmlBotComp) {
      // console.log(prevProps.htmlBotComp)
      if (prevProps.htmlBotComp) {
        this.htmlHistory.push({
          id: uuid.v4(),
          sender: 'ai',
          com: prevProps.htmlBotComp,
          // fullWidth: prevProps.htmlBotComp.props.data.message.payload.type === 'locations',
        })
      }
    }
  }

  componentDidUpdate() {
    this.scrollDown()
    setTimeout(() => {
      this.scrollDown()
    }, 1000)
  }

  scrollDown() {
    const objDiv = document.getElementById('botFeed');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

	render() {
		return (
			<div id='AIUX' style={comStyles().container}>
        <div style={comStyles().header}>
          <Avatar src={this.props.representative.thumbnail} />
          <h1 style={{ color: 'white', marginBottom: '0', }}>{this.props.representative.friendly_name}</h1>
        </div>
        <div id='botFeed' style={comStyles().botFeed}>
          <br />
        {/*
          <div style={comStyles().botProfile}>
            <img
              src={this.props.representative.thumbnail}
              alt='Avatar'
              style={{
                borderRadius: '50%',
                height: '150px',
                width: '150px',
              }}
            />
            <br />
            <div style={{ fontWeight: 'bold', fontSize: '1.2REM' }}>{ this.props.representative.friendly_name }</div>
            <Rate value={5} />
            <p>Intelligent Leasing Assistant</p>
          </div>
          */}
          {
            this.htmlHistory.map((_html) => {
              console.log(_html)
              // if (_html.fullWidth) {
              //   return (
              //     <div key={_html.id} style={messageStyles(_html.sender).container}>
              //       { _html.com }
              //     </div>
              //   )
              // } else {
                return (
                  <div key={_html.id} style={messageStyles(_html.sender).container}>
                    <div style={messageStyles(_html.sender).message}>
                      {
                        _html.sender === 'user'
                        ?
                        null
                        :
                        <Avatar src={this.props.representative.thumbnail} shape='circle' size='large' />
                      }
                      <div style={{ margin: '0px 10px' }}>
                        {_html.com}
                      </div>
                      {
                        _html.sender === 'user'
                        ?
                        <Avatar icon='user' shape='circle' size='large' />
                        :
                        null
                      }
                    </div>
                  </div>
                )
              // }
            })
          }
        </div>
        {
          this.props.input.show_input
          ?
          <div style={inputStyles(3).botInput}>
            {
              this.props.htmlInput
            }
          </div>
          :
          null
        }
			</div>
		)
	}
}

// defines the types of variables in this.props
AIUX.propTypes = {
	history: PropTypes.object.isRequired,
  // botIcon: PropTypes.string,        // passed in
  // botName: PropTypes.string,        // passed in
  htmlBotComp: PropTypes.object,       // passed in
  htmlUserComp: PropTypes.object,   // passed in
  htmlInput: PropTypes.object,      // passed in
  input: PropTypes.object.isRequired,
  representative: PropTypes.object.isRequired,
}

// for all optional props, define a default value
AIUX.defaultProps = {
  // botIcon: 'https://i2-prod.mirror.co.uk/incoming/article10263400.ece/ALTERNATES/s1200/PROD-Kim-Jong-Un.jpg',
  // botName: 'Kim',
  htmlBotComp: null,
  htmlUserComp: null,
  htmlInput: null,
}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(AIUX)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {
    input: redux.chat.input,
    representative: redux.advertisements.representative,
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
      width: '100%',
      height: '100%',
      // padding: '0px 20px 0px 20px',
      // margin: '10px',
      // background: '#56CCF2',  /* fallback for old browsers */
			// background: '-webkit-linear-gradient(to right, #2F80ED, #56CCF2)',  /* Chrome 10-25, Safari 5.1-6 */
			// background: 'linear-gradient(to right, #2F80ED, #56CCF2)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      // background: '#56CCF2',  /* fallback for old browsers */
      // background: '-webkit-linear-gradient(to right, #2F80ED, #56CCF2)',  /* Chrome 10-25, Safari 5.1-6 */
      // background: 'linear-gradient(to right, #2F80ED, #56CCF2)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    },
    header: {
      display: 'flex',
      // flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      height: '7vh',
      minWidth: '100%',
      maxWidth: '100%',
      // flexGrow: 1,
      background: '#56CCF2',  /* fallback for old browsers */
      background: '-webkit-linear-gradient(to right, #2F80ED, #56CCF2)',  /* Chrome 10-25, Safari 5.1-6 */
      background: 'linear-gradient(to right, #2F80ED, #56CCF2)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    },
    botFeed: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      minWidth: '100%',
      maxWidth: '100%',
      flexGrow: 16,
      backgroundColor: 'white',
      maxHeight: '93vh',
      overflowY: 'scroll',
      // background: '#56CCF2',  /* fallback for old browsers */
      // background: '-webkit-linear-gradient(to right, #2F80ED, #56CCF2)',  /* Chrome 10-25, Safari 5.1-6 */
      // background: 'linear-gradient(to right, #2F80ED, #56CCF2)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    },
    botProfile: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      // height: '500px',
      flexGrow: 10
    },
    userIcons: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'space-between',
      width: '100%',
      padding: '5px',
    }
	}
}

const inputStyles = (flexGrow = 0) => {
  return {
    botInput: {
      minWidth: '100%',
      maxWidth: '100%',
      // flexGrow: flexGrow,
      backgroundColor: 'aliceblue',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '10px',
    }
  }
}

const messageStyles = (sender) => {
  let floatDirection = 'left'
  if (sender === 'user') {
    floatDirection = 'right'
  }
  return {
    container: {
      width: '100%',
      height: 'auto',
    },
    message: {
      float: floatDirection,
      display: 'flex',
      flexDirection: 'row',
      margin: '10px',
    }
  }
}
