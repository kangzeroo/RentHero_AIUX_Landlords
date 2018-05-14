// Compt for copying as a template
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'


class MapComponent extends Component {

  constructor() {
    super()
    this.blue_map_pin = 'https://s3.amazonaws.com/rentburrow-static-assets/Icons/blue-dot.png'
  }

  componentDidMount() {
    this.mountGoogleMap()
  }

  mountGoogleMap() {
    const mapOptions = {
      center: {
        lat: parseFloat(this.props.coords.gps_x),
        lng: parseFloat(this.props.coords.gps_y),
      },
      zoom: 15,
      zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP
      },
      streetViewControlOptions: {
          position: google.maps.ControlPosition.RIGHT_TOP
      },
    }
    const mapTarget = new google.maps.Map(document.getElementById('mapTarget'), mapOptions)
    const marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.props.coords.gps_x, this.props.coords.gps_y),
        pin_type: 'building',
        icon: this.blue_map_pin,
        zIndex: 10,
    })
    marker.setMap(mapTarget)
	}

	render() {
		return (
			<div id='MapComponent' style={comStyles().container}>
        <div id='mapTarget' style={comStyles().map}></div>
        <div style={comStyles().addressContainer}>{ this.props.address }</div>
			</div>
		)
	}
}

// defines the types of variables in this.props
MapComponent.propTypes = {
	history: PropTypes.object.isRequired,
	coords: PropTypes.object.isRequired,				// passed in
  address: PropTypes.string.isRequired,       // passed in
}

// for all optional props, define a default value
MapComponent.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(MapComponent)

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
      // flexDirection: 'column',
      height: '300px',
      width: '300px',
      borderRadius: '20px',
      position: 'relative',
		},
    map: {
      height: '100%',
      width: '100%',
      zIndex: 20,
      borderRadius: '20px',
    },
    addressContainer: {
      textAlign: 'center',
      background: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      width: '100%',
      position: 'absolute',
      bottom: '0px',
      left: '0px',
      zIndex: 30,
      padding: '20px',
      borderRadius: '0px 0px 20px 20px'
    }
	}
}
