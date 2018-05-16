import uuid from 'uuid'
import AWS from 'aws-sdk/global'
import 'amazon-cognito-js'
import { AWS_FEDERATED_IDENTITY_ENV } from '../ENV_CREDs'

AWS.config.update({
	region: 'us-east-1'
})

export const retrieveTenantFromLocalStorage = () => {
	const p = new Promise((res, rej) => {
			const x = localStorage.getItem('renthero_tenant_token')
			if (x) {
				const renthero_tenant_token = JSON.parse(x)
				const cognitoidentity = new AWS.CognitoIdentity()
				let loginsObj = null
				if (renthero_tenant_token.type === 'passwordless') {
					// Add the Facebook access token to the Cognito credentials login map.
					loginsObj = { 'renthero.auth0.com': renthero_tenant_token.accessToken }
				} else if (renthero_tenant_token.type === 'google') {
					loginsObj = { 'accounts.google.com': renthero_tenant_token.accessToken }
				}
				if (renthero_tenant_token) {
					// Add the Facebook access token to the Cognito credentials login map.
					AWS.config.credentials = new AWS.CognitoIdentityCredentials({
						IdentityPoolId: AWS_FEDERATED_IDENTITY_ENV,
						Logins: renthero_tenant_token
					})
					// console.log(AWS.config.credentials)
					// AWS Cognito Sync to sync Facebook
					AWS.config.credentials.get(function() {
						const client = new AWS.CognitoSyncManager();
						// console.log(AWS.config.credentials)
						if (AWS.config.credentials.expired) {
							rej('Expired credentials')
						} else {
							localStorage.setItem('user_id', AWS.config.credentials.data.IdentityId)
							res({
								IdentityId: AWS.config.credentials.data.IdentityId
							})
						}
						// FROM GOOGLE LOGIN: "us-east-1:2492ef1f-b98d-441c-9edb-c0190390730f"
						// FROM PASSWORDLESS LOGIN: "us-east-1:40a7341f-4a86-4850-bb30-d7c994f203ba"
						// FROM COGNITO LOGIN: "us-east-1:3671aae5-58fc-41ce-9aaa-8f25ca9312c7"
					})
				} else {
					rej('No specified login method')
				}
			} else {
				// console.log('There was a problem logging you in.');
				rej('No Saved Login Token found')
			}
	})
	return p
}

export function registerGoogleLoginWithCognito(accessToken){
	const p = new Promise((res, rej) => {
		// Check if the user logged in successfully.
		console.log('registerGoogleLoginWithCognito')
		  if (accessToken) {

		    // console.log('You are now logged in.');
		    const cognitoidentity = new AWS.CognitoIdentity();
				const loginItem = {
  				 'accounts.google.com': accessToken
				}
		    // Add the Facebook access token to the Cognito credentials login map.
		    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
		      IdentityPoolId: AWS_FEDERATED_IDENTITY_ENV,
		      Logins: loginItem
		    })

				localStorage.setItem('renthero_tenant_token', JSON.stringify(loginItem))
				localStorage.setItem('header_token', JSON.stringify(accessToken))
				// AWS Cognito Sync to sync Facebook
		    AWS.config.credentials.get(function() {
			    const client = new AWS.CognitoSyncManager();
			    console.log(AWS.config.credentials)
					// console.log('yeee')
					localStorage.setItem('user_id', AWS.config.credentials.data.IdentityId)
					res({
						IdentityId: AWS.config.credentials.data.IdentityId
					})
				})
		  } else {
		    console.log('There was a problem logging you in.');
				rej('No access token provided')
		  }
	})
	return p
}

export function registerPasswordlessAuth0WithCognito(id_token){
	const p = new Promise((res, rej) => {
		// console.log('registerFacebookLoginWithCognito')
		// console.log(response)
		// Check if the user logged in successfully.
		  if (id_token) {

		    // console.log('You are now logged in.');
		    const cognitoidentity = new AWS.CognitoIdentity();
				const loginItem = {
					 'renthero.auth0.com': id_token
				}

		    // Add the Facebook access token to the Cognito credentials login map.
		    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
		      IdentityPoolId: AWS_FEDERATED_IDENTITY_ENV,
		      Logins: loginItem,
		    })

				localStorage.setItem('renthero_tenant_token', JSON.stringify(loginItem))
				localStorage.setItem('header_token', JSON.stringify(id_token))
		    // AWS Cognito Sync to sync Facebook
		    AWS.config.credentials.get(function(err) {
					console.log(err)
			    const client = new AWS.CognitoSyncManager();
			    console.log(AWS.config.credentials)
					if (AWS.config.credentials.data && AWS.config.credentials.data.IdentityId) {
						localStorage.setItem('user_id', AWS.config.credentials.data.IdentityId)
						res({
							IdentityId: AWS.config.credentials.data.IdentityId
						})
					} else {
						res({
							IdentityId: 'UNSIGNED'
						})
					}
				})
		  } else {
		    // console.log('There was a problem logging you in.');
				rej('No access token found')
		  }
	})
	return p
}

export const registerUnauthRoleWithCognito = () => {
	const p = new Promise((res, rej) => {
		// Add the unauthenticated_staff user to the Cognito credentials login map.
		AWS.config.credentials = new AWS.CognitoIdentityCredentials({
			IdentityPoolId: AWS_FEDERATED_IDENTITY_ENV
		})
		// AWS Cognito Sync to sync Facebook
		AWS.config.credentials.get(() => {
			const client = new AWS.CognitoSyncManager()
			// console.log(generate_TENANT_IDENTITY_POOL_ID())
			console.log(AWS.config.credentials)
			res({
				IdentityId: AWS.config.credentials.data.IdentityId
			})
		})
	})
	return p
}
