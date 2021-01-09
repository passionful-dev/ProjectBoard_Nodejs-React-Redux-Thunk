import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../store/actions/authActions'

const SignedInLinks = (props) => {
  // console.log(props)
  return (
    <ul className="right">
      <li>
        <NavLink to="/projects/create">New Project</NavLink>
      </li>
      <li>
        <a href="/" onClick={props.signOut}>Log Out</a>
      </li>
      <li>
        {/* <NavLink to="/" className='btn btn-floating pink accent-3'>NN</NavLink> */}
        <NavLink to="/" className='btn btn-floating pink accent-3'>
          {props.profile.firstName[0]+props.profile.lastName[0]}
        </NavLink>
      </li>
    </ul>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
}
export default connect(null, mapDispatchToProps)(SignedInLinks)
