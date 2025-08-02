import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Header from './components/Header'
import LandingPage from './pages/LandingPage'
import DoctorProfile from './pages/DoctorProfile'
import './styles.css'

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <main>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/doctor/:id" component={DoctorProfile} />
          </Switch>
        </main>
      </Router>
    )
  }
}

export default App;