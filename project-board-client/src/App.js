import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import SignIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import Dashboard from './components/dashboard/Dashboard'
import Navbar from './components/layout/Navbar'
import ProjectCreate from './components/projects/ProjectCreate'
import ProjectDetails from './components/projects/ProjectDetails'

export class App extends Component { 

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
          <Route exact path='/' component={Dashboard} />
            <Route path='/signin' component={SignIn} />
            <Route path='/users/create' component={SignUp} />
            <Route path='/projects/create' component={ProjectCreate} />
            <Route path='/projects/:id' component={ProjectDetails} />
            
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App