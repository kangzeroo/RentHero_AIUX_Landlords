// Compt for copying as a AIUX
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import uuid from 'uuid'
import moment from 'moment'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {
  Rate,
  Avatar,
  Icon,
  Input,
  List,
  Button,
} from 'antd'

class AIUX extends Component {

  constructor() {
    super()
    this.htmlHistory = []
    this.idHistory = []
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
        })
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.scroll !== nextProps.scroll) {
      this.scrollDown()
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
          <div style={{ width: '20%', }}>
            <div style={comStyles().font_logo}>RentHero</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <h2 style={{ color: 'white', marginBottom: '0', fontWeight: 'bold', }}>{this.props.representative.friendly_name}</h2>
            <p style={{ color: 'white', marginBottom: '0', }}>{ this.props.current_ad.ad_title }</p>
          </div>
          <div style={{ width: '20%', display: 'flex', justifyContent: 'flex-end', }}>
            <Icon type='ellipsis' style={{ color: 'white', fontSize: '1.8REM', fontWeight: 'bold', }} size='large' />
          </div>
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
              if (_html.sender === 'user') {
                // Question: _html.com.props.text
              }
              console.log(_html)
              if (_html.com.props && _html.com.props.data && _html.com.props.data.message && (!_html.com.props.data.message.text || (_html.com.props.data.message.text && _html.com.props.data.message.text === ''))) {
                console.log('Bastardized content: ', _html)
                return (
                  <div key={_html.id}>
                    <div style={{ marginLeft: '60px', }}>{_html.com}</div>
                  </div>
                )
              } else {
                return (
                  <div key={_html.id} style={messageStyles(_html.sender).container}>
                    <div style={messageStyles(_html.sender).message}>
                      {
                        _html.sender === 'user'
                        ?
                        null
                        :
                        <Avatar src={this.props.representative.thumbnail} shape='circle' size='large' style={comStyles().avatarSize} />
                      }
                      <div style={{ padding: '0px 10px' }}>
                        {_html.com}
                      </div>
                      {
                        _html.sender === 'user'
                        ?
                        <Avatar icon='user' shape='circle' size='large' style={comStyles().avatarSize, { background: 'none', border: 'white solid thin' }} />
                        :
                        null
                      }
                    </div>
                  </div>
                )
              }
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
  current_ad: PropTypes.object.isRequired,
  scroll: PropTypes.string.isRequired,
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
    current_ad: redux.advertisements.current_ad,
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
      // backgroundImage: 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',

      backgroundImage: 'linear-gradient(-225deg, #5D9FFF 0%, #B8DCFF 48%, #6BBBFF 100%)',

      // backgroundImage: 'linear-gradient(to top, #48c6ef 0%, #6f86d6 100%)',

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
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'white',
      height: '8vh',
      minWidth: '100%',
      maxWidth: '100%',
      padding: '10px',
      // flexGrow: 1,
      // background: '#56CCF2',  /* fallback for old browsers */
      // background: '-webkit-linear-gradient(to right, #2F80ED, #56CCF2)',  /* Chrome 10-25, Safari 5.1-6 */
      // background: 'linear-gradient(to right, #2F80ED, #56CCF2)', /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    },
    botFeed: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      minWidth: '100%',
      maxWidth: '100%',
      flexGrow: 16,
      // backgroundColor: 'white',
      maxHeight: '92vh',
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
    },
    avatarSize: {
      minWidth: '40px',
      maxWidth: '40px',
      minHeight: '40px',
      maxHeight: '40px',
    },
    font_logo: {
      fontSize: '1.0REM',
      color: 'white',
      fontWeight: 'bold',
      fontFamily: `'Carter One', cursive`,
      cursor: 'pointer',
    },
	}
}

const inputStyles = (flexGrow = 0) => {
  return {
    botInput: {
      minWidth: '100%',
      maxWidth: '100%',
      // flexGrow: flexGrow,
      // backgroundColor: 'aliceblue',
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
    },
  }
}
