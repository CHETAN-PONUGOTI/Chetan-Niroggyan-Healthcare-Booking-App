import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import DoctorCard from '../components/DoctorCard'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class LandingPage extends Component {
  state = {
    doctorsList: [],
    searchTerm: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getDoctors()
  }

  getDoctors = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    try {
      const response = await fetch('/api/doctors')
      if (response.ok) {
        const data = await response.json()
        this.setState({
          doctorsList: data,
          apiStatus: apiStatusConstants.success,
        })
      } else {
        this.setState({apiStatus: apiStatusConstants.failure})
      }
    } catch (e) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  handleSearchChange = event => {
    this.setState({searchTerm: event.target.value})
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#007bff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view">
      <h2>Oops! Something Went Wrong</h2>
      <p>We cannot seem to find the page you are looking for.</p>
      <button type="button" onClick={this.getDoctors}>
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {doctorsList, searchTerm} = this.state
    const filteredDoctors = doctorsList.filter(
      doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()),
    )

    return (
      <>
        <input
          type="text"
          placeholder="Search by name or specialization..."
          className="search-bar"
          value={searchTerm}
          onChange={this.handleSearchChange}
        />
        <div className="doctor-list">
          {filteredDoctors.map(doctor => (
            <Link
              to={`/doctor/${doctor.id}`}
              key={doctor.id}
              className="doctor-link"
            >
              <DoctorCard doctor={doctor} />
            </Link>
          ))}
        </div>
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

    return (
      <div className="container hm-container">
        <h1>Find Your Doctor</h1>
        {content}
      </div>
    )
  }
}

export default LandingPage;