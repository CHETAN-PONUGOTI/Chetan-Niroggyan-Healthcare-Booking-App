import React, {Component} from 'react'
import Cookies from 'js-cookie'
import {FaUser, FaEnvelope, FaCalendarCheck} from 'react-icons/fa'
class BookingForm extends Component {
  state = {
    patientName: '',
    email: '',
    dateTime: '',
    error: '',
    submitted: false,
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    const {patientName, email, dateTime} = this.state

    if (!patientName || !email || !dateTime) {
      this.setState({error: 'All fields are required.'})
      return
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      this.setState({error: 'Please enter a valid email address.'})
      return
    }

    this.setState({error: '', submitted: true})
    // Using js-cookie to set a cookie upon successful booking
    Cookies.set('appointment_details', JSON.stringify({patientName, dateTime}), {
      expires: 7,
    })
  }

  render() {
    const {submitted, patientName, email, dateTime, error} = this.state
    const {doctorName} = this.props

    if (submitted) {
      return (
        <div className="confirmation-message">
          <h3>Appointment Confirmed! ✅</h3>
          <p>
            Thank you, {patientName}. An appointment with {doctorName} has been
            requested for {new Date(dateTime).toLocaleString()}.
          </p>
          <p>A confirmation will be sent to {email}.</p>
        </div>
      )
    }

    return (
      <form onSubmit={this.handleSubmit} className="booking-form">
        {error && <p className="error-message">{error}</p>}
        <div className="form-group">
          <label htmlFor="patientName">
            <FaUser className="icon" /> Patient Name
          </label>
          <input
            type="text"
            id="patientName"
            name="patientName"
            value={patientName}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">
            <FaEnvelope className="icon" /> Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateTime">
            <FaCalendarCheck className="icon" /> Preferred Date & Time
          </label>
          <input
            type="datetime-local"
            id="dateTime"
            name="dateTime"
            value={dateTime}
            onChange={this.handleChange}
          />
        </div>
        <button type="submit" className="btn-book">
          Book Appointment
        </button>
      </form>
    )
  }
}

export default BookingForm;