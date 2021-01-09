import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'
import { connect } from 'react-redux'

const Navbar = (props) => {
  const { auth, profile } = props
  // console.log('auth[0]', auth[0])

  let links = null
  if(auth.length > 0){
    links = auth[0].userId ? <SignedInLinks profile={profile}/> : <SignedOutLinks />
  }
  else{
    links = <SignedOutLinks />
  }

  return (
    <div>
      <nav className="nav-wrapper purple">
        <div className="container">
          {/* <Link to='/' className="brand-logo left">ProjectBoard</Link> */}
          <Link to='/' className="brand-logo left">Project Board</Link>
            {/* <SignedInLinks />
            <SignedOutLinks />
           */}
            {links}
        </div>
      </nav>      
    </div>
  )
}

const mapStateToProps = (state) => {
  // console.log('state: ', state)
  const profile = (state.auth.length > 0) ? state.auth[0] : null

  return{
    auth: state.auth,
    profile
  }
}
export default connect(mapStateToProps)(Navbar)
