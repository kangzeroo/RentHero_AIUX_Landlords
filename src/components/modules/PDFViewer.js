// Compt for copying as a PDFViewer
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd-mobile'
import { Document } from 'react-pdf/dist/entry.webpack'
import { Page } from 'react-pdf'


class PDFViewer extends Component {

  constructor() {
    super()
    this.state = {
      numPages: null,
      pageNumber: 1,
    }
  }

  onDocumentLoad = (e) => {
    this.setState({ numPages: e.numPages })
  }

	render() {
		return (
			<div id='PDFViewer' style={comStyles().container}>
        <Document
          file={this.props.src}
          onLoadSuccess={(e) => this.onDocumentLoad(e)}
        >
          <Page pageNumber={this.state.pageNumber} />
        </Document>
        <p>Page {this.state.pageNumber} of {this.state.numPages}</p>
        <b onClick={() => this.setState({ pageNumber: this.state.pageNumber - 1 })}>Prev</b>
        <b onClick={() => this.setState({ pageNumber: this.state.pageNumber + 1 })}>Next</b>
			</div>
		)
	}
}

// defines the types of variables in this.props
PDFViewer.propTypes = {
	history: PropTypes.object.isRequired,
  src: PropTypes.string.isRequired,
}

// for all optional props, define a default value
PDFViewer.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(PDFViewer)

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
      minHeight: '500px',
		}
	}
}
