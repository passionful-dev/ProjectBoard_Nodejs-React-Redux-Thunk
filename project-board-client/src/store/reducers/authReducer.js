import {
  SIGN_IN, SIGN_IN_ERROR, 
  SIGN_OUT, SIGN_OUT_ERROR, 
  SIGN_UP, SIGN_UP_ERROR
} from '../actions/authActions'

const initialState = {
  authError: null
  // ,
  // user:[]
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP:
      console.log('sign up success', action.payload)
      return {...state, authError: null}
      // return state

    case SIGN_UP_ERROR:
      console.log('sign up error', action.err)
      return { ...state, authError: action.err.message }
      // return state


    case SIGN_IN:
      // console.log('state', state)
      console.log('Sign_in action is succeeded')
      // return {...state}

      // return {...state, authError: null}
      return [action.payload, { ...state, authError: null }]

    case SIGN_IN_ERROR:
      // // console.log('state', state)
      // // console.log('Sign in has error')  
      // return {...state}
      return { authError: 'Login failed!' }


    case SIGN_OUT:
      console.log('Signout success')
      // console.log('state', state)        
      return state.pop()
    // return [state[0]= null]

    case SIGN_OUT_ERROR:
      console.log('state', state)
      // console.log('Signout error')  
      return state


    default:
      return state
  }

}

export default authReducer
