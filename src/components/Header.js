import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {FaStethoscope} from 'react-icons/fa'


class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="container header-container">
          <Link to="/" className="logo-link">
            <FaStethoscope className="logo-icon" />
            <h1>HealthBook</h1>
          </Link>
        </div>
      </header>
    )
  }
}

export default Header;