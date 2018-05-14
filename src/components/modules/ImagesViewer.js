// Compt for copying as a template
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {
  Carousel,
} from 'antd-mobile'
import {
  renderProcessedImage,
  renderProcessedThumbnail600jpeg,
} from '../../api/general/general_api'

class ImagesViewer extends Component {

  constructor() {
    super()
    this.state = {
      imgHeight: 176,
    }
  }

  componentWillMount() {
    console.log('LOADED IMAGES VIEWER')
    console.log(this.props.images)
  }

	render() {
		return (
			<div id='ImagesViewer' style={comStyles().container}>
        <p>{this.props.text}</p>
        <Carousel style={{ width: '100%', }}>
          {
            this.props.images.map((img) => {
              return (
                <img
                  key={img.image_url}
                  src={renderProcessedImage(img.image_url)}
                  style={{ width: 'auto', height: '300px', verticalAlign: 'top' }}
                  alt=''
                  onLoad={() => {
                     // fire window resize event to change height
                     window.dispatchEvent(new Event('resize'));
                     this.setState({ imgHeight: 'auto' });
                   }}
                />
              )
            })
          }
        </Carousel>
			</div>
		)
	}
}

// defines the types of variables in this.props
ImagesViewer.propTypes = {
	history: PropTypes.object.isRequired,
  images: PropTypes.array.isRequired,         // passed in
  text: PropTypes.string.isRequired,          // passed in
}

// for all optional props, define a default value
ImagesViewer.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(ImagesViewer)

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
      width: '80vw',
      backgroundColor: 'aliceblue',
      // overflowX: 'scroll',
      padding: '20px',
      borderRadius: '20px',
		}
	}
}
