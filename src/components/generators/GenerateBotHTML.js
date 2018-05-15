// Compt for copying as a GenerateBotHTML
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import SubtitlesMachine from '../modules/SubtitlesMachine'
import {

} from 'antd'
import ImageCarousel from '../modules/ImageCarousel'
import VideoPlayer from '../modules/VideoPlayer'
import PDFViewer from '../modules/PDFViewer'
import FileDownloader from '../modules/FileDownloader'
import AudioPlayer from '../modules/AudioPlayer'
import QuickReply from '../modules/QuickReply'
import QuickMessage from '../modules/QuickMessage'
import ImagesViewer from '../modules/ImagesViewer'
import MapComponent from '../modules/MapComponent'

class GenerateBotHTML extends Component {

  generateHTML() {
    console.log(this.props.data)
    if (this.props.data.message.payload) {
      if (this.props.data.message.payload.attachment) {
        if (this.props.data.message.payload.attachment.type === 'image') {
          return (
            <ImageCarousel imageUrl={this.props.data.message.payload.attachment.payload.url} />
          )
        } else if (this.props.data.message.payload.attachment.type === 'video') {
          return (
            <VideoPlayer videoUrl={this.props.data.message.payload.attachment.payload.url} />
          )
        } else if (this.props.data.message.payload.attachment.type === 'audio') {
          return (<AudioPlayer audioUrl={this.props.data.message.payload.attachment.payload.url} />)
        } else if (this.props.data.message.payload.attachment.type === 'file') {
          if (this.props.data.message.payload.attachment.payload.url.indexOf('.pdf') > -1) {
            return (<PDFViewer src={this.props.data.message.payload.attachment.payload.url} />)
          } else {
            return (<FileDownloader src={this.props.data.message.payload.attachment.payload.url} />)
          }
        }
      } else if (this.props.data.message.payload.type === 'images') {
        return (
          <ImagesViewer
            text={this.props.data.message.payload.text}
            images={this.props.data.message.payload.images}
          />
        )
      } else if (this.props.data.message.payload.quick_replies) {
        return (<QuickReply data={this.props.data} />)
      } else if (this.props.data.message.text && this.props.data.message.text.length > 0) {
        return (
          <SubtitlesMachine
            speed={0.00000001}
            text={this.props.data.message.text}
            textStyles={{
              // fontSize: '1.3rem',
              color: 'black',
              textAlign: 'left',
            }}
            containerStyles={{
              width: '100%',
              backgroundColor: 'aliceblue',
              padding: '10px',
              borderRadius: '10px',
            }}
            doneEvent={() => {
              console.log('DONE')
              this.props.onDone()
            }}
          />
        )
        // return (
        //   <QuickMessage
        //     text={this.props.data.message.text}
        //   />
      // )
      } else if (this.props.data.message.payload.type === 'location') {
        return (
          <MapComponent
            coords={this.props.data.message.payload.location}
            address={this.props.data.message.payload.address}
          />
        )
      }
    } else {
      return (<SubtitlesMachine
        speed={0.00000001}
        text={this.props.data.message.text}
        textStyles={{
          // fontSize: '1.3rem',
          color: 'black',
          textAlign: 'left',
        }}
        containerStyles={{
          width: '100%',
          backgroundColor: 'aliceblue',
          padding: '10px',
          borderRadius: '10px',
        }}
        doneEvent={() => {
          console.log('DONE')
          this.props.onDone()
        }}
      />)
    }
  }

	render() {
		return (
			<div id='GenerateBotHTML' style={comStyles().container}>
				{this.generateHTML()}
			</div>
		)
	}
}

// defines the types of variables in this.props
GenerateBotHTML.propTypes = {
	history: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  onDone: PropTypes.func,
}

// for all optional props, define a default value
GenerateBotHTML.defaultProps = {
  onDone: () => {}
}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(GenerateBotHTML)

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
		}
	}
}
