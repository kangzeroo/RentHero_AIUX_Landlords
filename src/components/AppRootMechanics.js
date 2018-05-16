// Higher Order Compt for initializing actions upon AppRoot load

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import firebase from 'firebase'
import { retrieveTenantFromLocalStorage, registerUnauthRoleWithCognito } from '../api/aws/aws-cognito'
import { saveIdentityToRedux } from '../actions/auth/auth_actions'

// this 'higher order component'(HOC) creator takes a component (called ComposedComponent)
// and returns a new component with added functionality
export default (ComposedComponent) => {
	class AppRootMechanics extends Component {

		componentDidMount() {
			// const landlord_id = document.getElementById('root').getAttribute('landlord')
			// console.log(landlord_id)
				this.checkIfAlreadyLoggedIn()
		}

		checkIfAlreadyLoggedIn() {
			retrieveTenantFromLocalStorage()
				.then(({ IdentityId }) => {
					console.log(IdentityId)
					return this.props.saveIdentityToRedux(IdentityId)
					// return getTenantInfo(IdentityId)
				})
				.catch((err) => {
					console.log(err)
					registerUnauthRoleWithCognito().then(({ IdentityId }) => {
		        console.log(IdentityId)
						// us-east-1:90170b10-491a-4a19-8faf-2144e2ba0f35
						// return getLeadInfo(IdentityId)
						return this.props.saveIdentityToRedux(IdentityId)
		      })
				})
		}

		render() {
			// the rendered composed component, with props passed through
			return <ComposedComponent id='AppRootKernal' {...this.props} />
		}
	}

  // defines the types of variables in this.props
  AppRootMechanics.propTypes = {
  	history: PropTypes.object.isRequired,
		saveIdentityToRedux: PropTypes.func.isRequired,
  }

  // for all optional props, define a default value
  AppRootMechanics.defaultProps = {

  }

	const mapStateToProps = (redux) => {
		return {
		}
	}

	// we nest our custom HOC to connect(), which in itself is a HOC
	// we can actually nest HOC infinitely deep
	return withRouter(
		connect(mapStateToProps, {
			saveIdentityToRedux,
    })(AppRootMechanics)
	)
}

// Pseudo-code demonstrating how to use the higher order component (HOC)
/*
	// In some other location (not in this file), we want to use this HOC...
	import AppRootMechanics	// The HOC
	import Resources		// The component to be wrapped
	const ComposedComponent = AppRootMechanics(Resources);

	// In some render method...
	<ComposedComponent />

	// <ComposedComponent> actually renders the AppRootMechanics class, which renders the composed component
	// This 2 layer method is powerful because when we pass in props to <ComposedComponent> like below:
	<ComposedComponent propA={propA} />
	// we can pass those props into the 2nd layer (composed component) using a correct 'this' reference to the 1st layer
*/
