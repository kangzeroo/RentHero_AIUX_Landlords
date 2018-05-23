// Compt for copying as a template
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import {
  Button,
  DatePicker,
  message,
} from 'antd'
import { requestTour } from '../../api/leads/leads_api'

class TourSelection extends Component {

  constructor() {
    super()
    this.state = {
      selected_tour_date: {},
      tour_selected: false,

      saving: false,
      saved: false,
    }
  }

  bookTour() {
    this.setState({
      saving: true,
    })
    console.log(moment(this.state.selected_tour_date).format())
    const requested_for = moment(this.state.selected_tour_date).format()
    requestTour(this.props.current_ad.ad_id, this.props.identityId, requested_for)
      .then((data) => {
        this.setState({
          saving: false,
          saved: true,
        })
        message.success(data.message)
        this.props.requestedTour(data.tour_id)
      })
      .catch((err) => {
        console.log(err)
        message.error(err.response.data)
      })
  }

  renderCalendar() {
    const range = (start, end) => {
      const result = [];
      for (let i = start; i < end; i++) {
        result.push(i);
      }
      return result;
    }
    const disabledDate = (current) => {
      return current && current < moment().endOf('day')
    }
    const disabledDateTime = () => {
      return {
        disabledHours: () => range(0, 24).splice(0, 9).splice(21, 24),
      };
    }
    const onChange = (value, dateString) => {
      this.setState({
        selected_tour_date: value,
      })
    }

    const onOk = (value) => {
      this.props.scrollDown()
      this.setState({
        selected_tour_date: value,
        tour_selected: true,
      })
    }
    return (
      <DatePicker
        placeholder='select tour date & time'
        format='YYYY-MM-DD h:mm a'
        disabledDate={disabledDate}
        disabledTime={disabledDateTime}
        showTime={{ format: 'h:mm a', defaultValue: moment('9:00', 'h:mm a') }}
        onChange={onChange}
        onOk={onOk}
        style={{ width: '100%', borderRadius: '25px' }}
        size='large'
        disabled={this.state.saved}
      />
    )
  }

	render() {
		return (
			<div id='TourSelection' style={comStyles().container}>
        <h2>Tour Request</h2>
        <p>{`Select a date & time where you'll be able to take a tour`}</p>
        <br />
        {
          this.renderCalendar()
        }
        <br />
        {
          this.state.tour_selected
          ?
          <Button type='primary' onClick={() => this.bookTour()} disabled={this.state.saving || this.state.saved} style={{ borderRadius: '25px' }}>
            Send Tour Request
          </Button>
          :
          null
        }
			</div>
		)
	}
}

// defines the types of variables in this.props
TourSelection.propTypes = {
	history: PropTypes.object.isRequired,
  identityId: PropTypes.string.isRequired,
  current_ad: PropTypes.object.isRequired,
  payload: PropTypes.object.isRequired,     // passed in
  scrollDown: PropTypes.func,               // passed in
  requestedTour: PropTypes.func,            // passed in
}

// for all optional props, define a default value
TourSelection.defaultProps = {
  scrollDown: () => {},
  requestedTour: () => {},
}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(TourSelection)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {
    identityId: redux.auth.identityId,
    current_ad: redux.advertisements.current_ad,
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
      justifyContent: 'center',
      alignItems: 'center',
		},
    selectButton: {
      width: '100%',
      borderRadius: '20px',
      border: '#2faded solid 2px',
      color: '#2faded',
    },
	}
}
