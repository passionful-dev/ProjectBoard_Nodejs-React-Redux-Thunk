export const SIGN_IN = 'SIGN_IN'
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR'
export const SIGN_OUT = 'SIGN_OUT'
export const SIGN_OUT_ERROR = 'SIGN_OUT_ERROR'
export const SIGN_UP = 'SIGN_UP'
export const SIGN_UP_ERROR = 'SIGN_UP_ERROR'


export const signIn = (user) => {
  return (dispatch, getState) => {
    // make async call to db
    fetch('http://localhost:5000/users/all/signIn', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      // .then(data => console.log('output from server: ', data))
      .then((data) => {
        dispatch({ type: SIGN_IN, payload: data });
      })
      .catch((err) => {
        dispatch({ type: SIGN_IN_ERROR, err });
      })
  }
};


export const signOut = () => {
  return (dispatch) => {
    // make async call to db
    fetch('http://localhost:5000/users/all/signOut')
      // .then(res => res.json())
      // .then(data => console.log('output from server: ', data))
      .then((data) => {
        dispatch({ type: SIGN_OUT, payload: data });
      })
      .catch((err) => {
        dispatch({ type: SIGN_OUT_ERROR, err });
      })
  }
};


export const signUp = (user) => {
  return (dispatch, getState) => {
    // make async call to db
    fetch('http://localhost:5000/users', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(user)
    })
      .then((user) => {
        dispatch({ type: SIGN_UP, payload: user });
      })
      .catch((err) => {
        dispatch({ type: SIGN_UP_ERROR, err });
      })
  }
};