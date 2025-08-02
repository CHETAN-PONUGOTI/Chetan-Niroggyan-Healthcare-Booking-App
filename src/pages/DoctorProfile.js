import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import {FaCalendarAlt} from 'react-icons/fa'
import BookingForm from '../components/BookingForm'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class DoctorProfile extends Component {
  state = {
    doctorData: null,
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getDoctorData()
  }

  getDoctorData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    try {
      const response = await fetch(`/api/doctors/${id}`)
      if (response.ok) {
        const data = await response.json()
        this.setState({
          doctorData: data,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (e) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#007bff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view">
      <h2>Doctor Not Found</h2>
      <p>Could not retrieve details for this doctor.</p>
      <Link to="/" className="btn-book">
        Back to All Doctors
      </Link>
    </div>
  )

  renderSuccessView = () => {
    const {doctorData} = this.state
    const {
      name,
      specialization,
      image,
      availabilityStatus,
      schedule,
    } = doctorData

    return (
      <>
        <div className="profile-header">
          <img src={image} alt={name} className="profile-image-large" />
          <div className="profile-info">
            <h1>{name}</h1>
            <h2>{specialization}</h2>
            <p>
              Status:{' '}
              <span
                className={`status ${availabilityStatus
                  .toLowerCase()
                  .replace(/\s+/g, '-')}`}
              >
                {availabilityStatus}
              </span>
            </p>
          </div>
        </div>

        <div className="schedule-section">
          <h3>Availability Schedule</h3>
          {schedule.length > 0 ? (
            <ul>
              {schedule.map(slot => (
                <li key={slot.day}>
                  <FaCalendarAlt className="icon" /> {slot.day}: {slot.time}
                </li>
              ))}
            </ul>
          ) : (
            <p>Not available at the moment.</p>
          )}
        </div>

        <div className="booking-section">
          <h2>Book an Appointment</h2>
          {availabilityStatus !== 'On Leave' ? (
            <BookingForm doctorName={name} />
          ) : (
            <p>This doctor is currently on leave and cannot be booked.</p>
          )}
        </div>
        <Link to="/" className="back-link">
          ← Back to all doctors
        </Link>
      </>
    )
  }

  render() {
    const {apiStatus} = this.state
    let content
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        content = this.renderLoadingView()
        break
      case apiStatusConstants.success:
        content = this.renderSuccessView()
        break
      case apiStatusConstants.failure:
        content = this.renderFailureView()
        break
      default:
        content = null
    }
    return <div className="container">{content}</div>
  }
}

export default DoctorProfile;