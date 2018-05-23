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
  Button,
  Spin,
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
      images: [],

      imgHeight: 176,

      toggle_modal: false,
      modal_name: '',
      context: {},

      slideIndex: 0,

      loading: false,
      loadingMore: false,
      showLoadingMore: true,
    }
  }

  componentWillMount() {
    if (screen.width <= 550 && this.props.images.length > 3) {
      this.setState({
        images: this.props.images.slice(0, 3)
      })
    } else {
      this.setState({
        images: this.props.images,
        showLoadingMore: false,
      })
    }
  }

  onLoadMore() {
    this.setState({
      loadingMore: true,
    })
    if (this.state.images.length + 3 < this.props.images.length) {
      this.setState({
        images: this.props.images.slice(0, this.state.images.length + 3),
        loadingMore: false,
      })
    } else {
      this.setState({
        images: this.props.images,
        loadingMore: false,
        showLoadingMore: false,
      })
    }
  }

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
    const closeModal = () => {
      this.toggleModal(false, '')
      this.setState({
        slideIndex: 0,
      })
    }
    const goLeft = (slideIndex) => {
      if (slideIndex === 0) {
        this.setState({
          slideIndex: this.props.images.length - 1,
        })
      } else {
        this.setState({
          slideIndex: slideIndex - 1
        })
      }
    }
    const goRight = (slideIndex) => {
      if (slideIndex === this.props.images.length - 1) {
        this.setState({
          slideIndex: 0,
        })
      } else {
        this.setState({
          slideIndex: slideIndex + 1
        })
      }
    }
    return (
      <Modal
        visible={this.state.toggle_modal}
        onClose={closeModal}
        transparent
        maskClosable
        style={{ width: '100%', background: 'inherit' }}
      >
        <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 10000 }}>
          <Icon
            type='close'
            style={{ color: 'white', fontSize: '2rem', }}
            size='large'
            onClick={closeModal}
          />
        </div>
        <div style={{ position: 'absolute', left: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', zIndex: 1000 }}>
          <Icon
            type='left'
            style={{ color: 'white', fontSize: '2rem' }}
            size='large'
            onClick={() => goLeft(this.state.slideIndex)}
          />
        </div>
        <div style={{ position: 'absolute', right: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', zIndex: 1000 }}>
          <Icon
            type='right'
            style={{ color: 'white', fontSize: '2rem' }}
            size='large'
            onClick={() => goRight(this.state.slideIndex)}
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
              [context].concat(this.props.images.map(i => i.image_url).filter(i => i !== context)).map((image) => {
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
    const { loading, loadingMore, showLoadingMore, images } = this.state
    const loadMore = showLoadingMore ? (
      <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
        {loadingMore && <Spin />}
        {!loadingMore && <Button type='primary' onClick={() => this.onLoadMore()} style={{ borderRadius: '25px' }}>Load More</Button>}
      </div>
    ) : null;
    return (
      <div id='ImagesViewer' style={comStyles().container}>
        <List
          grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4, xl: 4, xxl: 4 }}
          loading={loading}
          loadMore={loadMore}
          dataSource={images}
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
      padding: '20px 20px 0px 20px',
      borderRadius: '20px',
		}
	}
}
