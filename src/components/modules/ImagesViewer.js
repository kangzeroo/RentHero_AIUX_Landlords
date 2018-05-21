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
  Carousel,
  Modal,
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

      toggle_modal: false,
      modal_name: '',
      context: {},

      slideIndex: 0,
    }
  }

  componentWillMount() {
    console.log('LOADED IMAGES VIEWER')
    console.log(this.props.images)
  }
  //
	// render() {
	// 	return (
	// 		<div id='ImagesViewer' style={comStyles().container}>
  //       <p>{this.props.text}</p>
  //       <Carousel style={{ width: '100%', }}>
  //         {
  //           this.props.images.map((img) => {
  //             return (
  //               <img
  //                 key={img.image_url}
  //                 src={renderProcessedImage(img.image_url)}
  //                 style={{ width: 'auto', height: '300px', verticalAlign: 'top' }}
  //                 alt=''
  //                 onLoad={() => {
  //                    // fire window resize event to change height
  //                    window.dispatchEvent(new Event('resize'));
  //                    this.setState({ imgHeight: 'auto' });
  //                  }}
  //               />
  //             )
  //           })
  //         }
  //       </Carousel>
	// 		</div>
	// 	)
	// }

  toggleModal(bool, attr, context) {
    if (bool && attr) {
      history.pushState(null, null, `${this.props.location.pathname}?show=${attr}`)
    } else {
      history.pushState(null, null, `${this.props.location.pathname}`)
    }
    this.setState({
      toggle_modal: bool,
      modal_name: attr,
      context,
    })
  }

  renderAppropriateModal(modal_name, context) {
    if (modal_name === 'show_image') {
      return this.renderImagePopup(context)
    }
  }

  renderImagePopup(context) {
    // const m = document.getElementsByClassName('am-modal-content')
    // console.log(m)
    // m.style.background = 'inherit'
    return (
      <Modal
        visible={this.state.toggle_modal}
        onClose={() => this.toggleModal(false, '')}
        transparent
        maskClosable
        style={{ width: '100%', background: 'inherit' }}
      >
        <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10000 }}>
          <Icon
            type='close'
            style={{ color: 'white', fontSize: '2rem', }}
            size='large'
            onClick={() => this.toggleModal(false, '')}
          />
        </div>
        <div style={{ position: 'absolute', left: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', zIndex: 1000 }}>
          <Icon
            type='left'
            style={{ color: 'white', fontSize: '2rem' }}
            size='large'
            onClick={() => this.setState({ slideIndex: this.state.slideIndex - 1 })}
          />
        </div>
        <div style={{ position: 'absolute', right: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', zIndex: 1000 }}>
          <Icon
            type='right'
            style={{ color: 'white', fontSize: '2rem' }}
            size='large'
            onClick={() => this.setState({ slideIndex: this.state.slideIndex + 1 })}
          />
        </div>
          <Carousel
            infinite
            dots={false}
            style={{ width: '100%' }}
            selectedIndex={this.state.slideIndex}
            beforeChange={(from, to) => this.setState({ slideIndex: to })}
          >
            {
              [context].concat(this.props.images.map(i => i.image_url).filter(i => i !== context)).map(image => {
                return (
                  <img
                    key={image}
                    src={renderProcessedImage(image)}
                    style={{ width: '100%', height: 'auto', verticalAlign: 'top' }}
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

      </Modal>
    )
  }

  render() {
    return (
      <div id='ImagesViewer' style={comStyles().container}>
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }}
          dataSource={this.props.images}
          renderItem={item => (
            <List.Item>
              <Card
                cover={<img src={renderProcessedImage(item.image_url)} />}
                bodyStyle={{ margin: 0, padding: 0 }}
                onClick={() => this.toggleModal(true, 'show_image', item.image_url)}
              />
            </List.Item>
          )}
        />
        {
          this.renderAppropriateModal(this.state.modal_name, this.state.context)
        }
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
