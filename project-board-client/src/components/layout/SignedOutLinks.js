import React from 'react'
import { NavLink } from 'react-router-dom'

const SignedOutLinks = () => {
  return (
    <ul className="right">
      <li>
        <NavLink to="/users/create">Signup</NavLink>
      </li>
      <li>
        <NavLink to="/signin">Login</NavLink>
      </li>
      <li>
        <div className='btn btn-floating pink accent-3'></div>
        
      </li>
    </ul>
  )
}

export default SignedOutLinks
