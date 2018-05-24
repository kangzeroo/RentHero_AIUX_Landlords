// Compt for copying as a template
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {
  List,
  Card,
  Icon,
} from 'antd'
import {
  Button,
} from 'antd-mobile'
import SubtitlesMachine from '../modules/SubtitlesMachine'

class HomePage extends Component {

  constructor() {
    super()
    this.state = {
    }
  }

  componentWillMount() {
  }

  openUrl(url) {
    // const win = window.open(url, '_blank')
    // win.focus()
    window.open(url)
  }

	render() {
		return (
			<div id='HomePage' style={comStyles().container}>
        <div style={comStyles().font_logo}>RentHero</div>
        <div style={comStyles().tagline}>
          <SubtitlesMachine
            speed={0.5}
            text='Your AI rental assistant. Qualify more rentals than humanly possible.'
            textStyles={{
              fontSize: '1rem',
              color: 'white',
              textAlign: 'center',
              fontStyle: 'italic',
            }}
          />
        </div>
        {/*<Button onClick={() => this.props.history.push('/beta/signup/tenants')} type='ghost' style={{ width: '250px', color: 'white', border: '1px solid white' }}>
          Tenant Signup <Icon type='right' />
        </Button>
        <div style={{ width: '100%', height: '10px' }}></div>
        <Button onClick={() => this.props.history.push('/beta/signup/landlords')} type='ghost' style={{ width: '250px', color: 'white', border: '1px solid white' }}>
          Landlord Signup <Icon type='right' />
        </Button>*/}
        <div onClick={() => this.props.history.push('/prop/d5cd68d9-fcc4-4abf-84e7-b0c52a8d9dbb')} style={comStyles().demo}>
          Demo in Private Beta
        </div>
			</div>
		)
	}
}

// defines the types of variables in this.props
HomePage.propTypes = {
	history: PropTypes.object.isRequired,
}

// for all optional props, define a default value
HomePage.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(HomePage)

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
    font_logo: {
      fontSize: '3rem',
      color: 'white',
      // fontWeight: 'bold',
      fontFamily: `'Carter One', cursive`,
      margin: '0px 0px 20px 0px'
    },
    tagline: {
      margin: '0px 0px 100px 0px',
      width: '50%',
    },
    demo: {
      fontSize: '1rem',
      color: 'white',
      bottom: '20px',
      position: 'absolute',
      cursor: 'pointer',
    }
	}
}
