export const CREATE_NOTIFICATION = 'CREATE_NOTIFICATION'
export const LIST_NOTIFICATIONS = 'LIST_NOTIFICATIONS'

export const createNotification = (notification) => {
  return (dispatch, getState) => {
    // make async call to db
    fetch('http://localhost:5000/notifications', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(notification)
    })
      .then(() => {
        dispatch({ type: CREATE_NOTIFICATION });
      })
      .catch((err) => {
        dispatch({ type: 'CREATE_NOTIFICATION_ERROR', err });
      })
  }
};

export const listNotifications = () => {
  return (dispatch) => {
    // make async call to db
    fetch('http://localhost:5000/notifications/all/userFullname')
      .then(res => res.json())
      .then((notifications) => {
        dispatch({ type: LIST_NOTIFICATIONS, payload: notifications });
      })
      .catch((err) => {
        dispatch({ type: 'LIST_NOTIFICATIONS_ERROR', err });
      })
  }
};