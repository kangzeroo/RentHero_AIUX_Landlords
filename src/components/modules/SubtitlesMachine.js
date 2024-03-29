// Compt for copying as a SubtitlesMachine
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import uuid from 'uuid'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd'


class SubtitlesMachine extends Component {

  constructor() {
    super()
    this.state = {
      text: '',
      inverse_text: '',
      divID: uuid.v4(),
      absDimensions: {}
    }
  }

  componentWillMount() {
    this.setState({
      absDimensions: this.props.containerStyles
    })
  }

  componentDidMount() {
    if (this.props.text.length > 250) {
      this.setState({
        text: this.props.text
      })
    } else {
      this.renderAnimation(this.props.text)
    }
  }

  renderAnimation(text) {
    const lex = text.split('')
    let count = 0
    // const textNode = document.createTextNode(this.props.text)
    const placeNode = document.createElement('div')
    placeNode.setAttribute('id', 'absText')
    const textNode = document.createTextNode(this.props.text)
    placeNode.appendChild(textNode)
    // textNode.style.visibility = 'hidden'
    const divID = document.getElementById(this.state.divID)
    divID.appendChild(textNode)
    const sub = divID.parentNode
    const w = sub.offsetWidth
    const h = sub.offsetHeight
    // divID.setAttribute('style', 'visibility: hidden;')
    this.setState({
      absDimensions: {
        ...this.props.containerStyles,
        minHeight: h,
        minWidth: w,
        height: h,
        width: w,
        maxHeight: h,
        maxWidth: w,
      }
    }, () => {
      placeNode.remove()
      divID.remove()
    })
    const onNext = ({ obs }) => {
      // console.log('OBSERVABLE NEXT')
      let waitTime = 70 * this.props.speed
      if (count === lex.length + 1) {
        obs.complete()
      } else {
        this.setState({
          text: text.slice(0, count),
          inverse_text: text.slice(count)
        })
        if (lex[count-1] === ',') {
          waitTime = waitTime * 4
        } else if (lex[count-1] === '.' || lex[count-1] === '!' || lex[count-1] === '?') {
          waitTime = waitTime * 6
        }
        count++
        setTimeout(() => {
          obs.next({
            obs
          })
        }, waitTime)
      }
    }
    Rx.Observable.create((obs) => {
      obs.next({
        obs
      })
    }).subscribe({
      next: onNext,
      error: (err) => {
        // console.log('OBSERVABLE ERROR')
        console.log(err)
      },
      complete: (y) => {
        // console.log('OBSERVABLE COMPLETE')
        this.props.doneEvent()
      }
    })
  }

	render() {
		return (
			<div id='SubtitlesMachine' style={comStyles({ containerStyles: this.state.absDimensions }).container}>
        <div id={this.state.divID} style={{ width: 'auto', height: 'auto' }}>
        </div>
				<div style={comStyles({ textStyles: this.props.textStyles }).text}>{this.state.text}</div>
			</div>
		)
	}
}

// defines the types of variables in this.props
SubtitlesMachine.propTypes = {
	history: PropTypes.object.isRequired,
  speed: PropTypes.number,    // passed in
  text: PropTypes.string,     // passed in
  containerStyles: PropTypes.object,    // passed in
  textStyles: PropTypes.object,         // passed in
  doneEvent: PropTypes.func,        // passed in
}

// for all optional props, define a default value
SubtitlesMachine.defaultProps = {
  speed: 1, // a number
  text: `Hey there! Check out this conversation UI animation, isn't it great? Mhmm yes, it is amazing.`,
  containerStyles: {
  },
  textStyles: {
    color: 'blue',
    fontWeight: 'bold',
  },
  doneEvent: () => {},
}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(SubtitlesMachine)

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
const comStyles = ({ containerStyles, textStyles }) => {
  if (!containerStyles) {
    containerStyles = {}
  }
  if (!textStyles) {
    textStyles = {}
  }
	return {
		container: {
      ...containerStyles,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'wrap',
		},
    text: {
      ...textStyles,
    },
    inverse_text: {
      ...textStyles,
      color: 'rgba(0,0,0,0)'
    }
	}
}
