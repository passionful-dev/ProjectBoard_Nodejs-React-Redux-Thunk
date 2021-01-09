import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signIn } from '../../store/actions/authActions'

export class SignIn extends Component {
  state = {
    email: '',
    userPassword: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state);
    this.props.signIn(this.state)
  }

  render() {
    const { authError, userId } = this.props
    // console.log('this.props: ', this.props)
    // console.log('authError: ', authError)
    // console.log('userId-signIn:', userId)
    if(userId) return <Redirect to='/' />
    return (
      <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Sign In</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="text" id="email" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <label htmlFor="userPassword">Password</label>
            <input type="password" id="userPassword" onChange={this.handleChange}/>
          </div>
          <div className="input-field">
            <button className="btn pink accent-3 z-depth-0">Login</button>
            <div className="red-text center">
              { authError ? <p>{authError}</p> : null }
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log('mapStateToProps-state: ', state)

  const userId = (state.auth.length > 0) ? state.auth[0].userId : null
  return{
    authError: state.auth.authError,
    userId
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (user) => dispatch(signIn(user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)
