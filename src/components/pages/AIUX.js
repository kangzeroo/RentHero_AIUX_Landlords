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

} from 'antd-mobile'


class AIUX extends Component {

  constructor() {
    super()
    this.htmlHistory = []
  }

  componentWillMount() {
    this.htmlHistory.push({
      id: uuid.v4(),
      sender: 'ai',
      com: this.props.htmlBotComp
    })
  }

  componentWillUpdate(prevProps, prevState) {
    if (prevProps.htmlUserComp !== this.props.htmlUserComp) {
      this.htmlHistory.push({
        id: uuid.v4(),
        sender: 'user',
        com: prevProps.htmlUserComp
      })
    }
    if (prevProps.htmlBotComp !== this.props.htmlBotComp) {
      this.htmlHistory.push({
        id: uuid.v4(),
        sender: 'ai',
        com: prevProps.htmlBotComp
      })
    }
  }

  componentDidUpdate() {
    this.scrollDown()
  }

  scrollDown() {
    const objDiv = document.getElementById('botFeed');
    objDiv.scrollTop = objDiv.scrollHeight;
  }

	render() {
		return (
			<div id='AIUX' style={comStyles().container}>
        <div style={comStyles().botProfile}>
          <h1 style={{ color: 'white' }}>{this.props.botName}</h1>
        </div>
        <div id='botFeed' style={comStyles().botFeed}>
          {
            this.htmlHistory.map((_html) => {
              return (
                <div key={_html.id} style={messageStyles(_html.sender).container}>
                  <div style={messageStyles(_html.sender).message}>
                    {_html.com}
                  </div>
                </div>
              )
            })
          }
        </div>
        <div style={inputStyles(3).botInput}>
          {
            this.props.htmlInput
          }
        </div>
			</div>
		)
	}
}

// defines the types of variables in this.props
AIUX.propTypes = {
	history: PropTypes.object.isRequired,
  botIcon: PropTypes.string,        // passed in
  botName: PropTypes.string,        // passed in
  htmlBotComp: PropTypes.object,       // passed in
  htmlUserComp: PropTypes.object,   // passed in
  htmlInput: PropTypes.object,      // passed in
}

// for all optional props, define a default value
AIUX.defaultProps = {
  botIcon: 'https://academist-app-production.s3.amazonaws.com/uploads/user/profile_image/1744/default_user_icon.png',
  botName: 'RentHero AI',
  htmlBotComp: null,
  htmlUserComp: null,
  htmlInput: null,
}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(AIUX)

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
      width: '100vw',
      height: '100vh',
      padding: '0px 20px 0px 20px',
      margin: '10px',
      background: '#56CCF2',  /* fallback for old browsers */
			background: '-webkit-linear-gradient(to right, #2F80ED, #56CCF2)',  /* Chrome 10-25, Safari 5.1-6 */
			background: 'linear-gradient(to right, #2F80ED, #56CCF2)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
		},
    botProfile: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
      minHeight: '30px',
      minWidth: '100%',
      maxWidth: '100%',
      flexGrow: 1,
      backgroundColor: 'green',
    },
    botFeed: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      minWidth: '100%',
      maxWidth: '100%',
      flexGrow: 16,
      backgroundColor: 'red',
      maxHeight: '90vh',
      overflowY: 'scroll',
    },
	}
}

const inputStyles = (flexGrow = 0) => {
  return {
    botInput: {
      minWidth: '100%',
      maxWidth: '100%',
      flexGrow: flexGrow,
      backgroundColor: 'blue',
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
    },
    message: {
      float: floatDirection
    }
  }
}
