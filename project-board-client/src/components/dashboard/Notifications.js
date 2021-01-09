import React from 'react'
import moment from 'moment'

const Notifications = (props) => {
  const { notifications } = props
  return (
    <div className="section">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Notifications</span>
          <ul className="notifications">
            {/* <li>Notification</li>
            <li>Notification</li>
            <li>Notification</li>
            <li>Notification</li> */}

            { notifications.length && notifications.map(item => {
              return (
                <li key={item.notificationId}>
                  <span className="pink-text accent-3">{item.firstName} {item.lastName} </span>
                  <span>{item.content}</span>
                  <div className="grey-text note-date">
                    {moment(item.createdDateTime).fromNow()}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Notifications
