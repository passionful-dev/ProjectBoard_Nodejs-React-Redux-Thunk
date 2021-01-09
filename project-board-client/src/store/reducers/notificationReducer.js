import { CREATE_NOTIFICATION, LIST_NOTIFICATIONS } from '../actions/notificationActions'

const initialState = {
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NOTIFICATION:
      // console.log('created project', action.payload)
      return {...state}
      // return [action.payload]

    case 'CREATE_NOTIFICATION_ERROR':
      console.log('notification creation error', action.err)
      return state

    case LIST_NOTIFICATIONS:
      // console.log('notification lists', action.payload)
      // return state
      return [...action.payload]

    case 'NOTIFICATION_LIST_ERROR':
      console.log('notification listing error', action.err)
      return state

    default:
      return state
  }

}

export default notificationReducer

