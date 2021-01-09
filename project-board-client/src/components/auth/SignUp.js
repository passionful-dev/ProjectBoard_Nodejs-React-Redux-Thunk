import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/actions/authActions'
import { connect } from 'react-redux'
import { createNotification } from '../../store/actions/notificationActions';

export class SignUp extends Component {
  state = {
    email: '',
    userPassword: '', 
    firstName: '',
    lastName: ''       
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e) => {
    // e.preventDefault();
    this.props.signUp(this.state);

    let notification = {
      content: 'Joined the party!!!!',
      userIdOrEmail: this.state.email
    }
    this.props.createNotification(notification)

    this.props.history.push('/')
    // console.log(notification)    
  }

  render() {
    const { userId, authError } = this.props

    if(userId) return <Redirect to='/' />

    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Sign Up</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="userPassword">Password</label>
            <input type="password" id="userPassword" onChange={this.handleChange}/>
          </div>
          
          <div className="input-field">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" onChange={this.handleChange}/>
          </div>
          
          <div className="input-field">
            <button className="btn pink accent-3 z-depth-0">Sign up</button>
          </div>
          <div className="red-text center">
            {authError ? <p>{authError}</p> : null}
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log('state-mapStateToProps: ', state)
  const userId = (state.auth.length > 0) ? state.auth[0].userId : null
  return {
    userId,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (user) => dispatch(signUp(user)),
    createNotification: (notification) => dispatch(createNotification(notification))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp)