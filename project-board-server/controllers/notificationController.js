const pool = require('../database/db')
const { DateTime } = require('luxon')
const { v4: uuidv4 } = require('uuid')


// add notification
//localhost:5000/notifications/
const create = async (req, res) => {
  try {
    notificationId = uuidv4()
    createdDateTime = DateTime.utc().toLocal().toString() //2021-01-05T17:36:36.497+01:00
    
    const { content, userIdOrEmail } = req.body

    const newNotification = await pool.query(
      "INSERT INTO notifications (notificationId, content, userIdOrEmail, createdDateTime) VALUES (?, ?, ?, ?)",
      [notificationId, content, userIdOrEmail, createdDateTime]
    )

    res.json({
              'notificationId': notificationId,
              'content': content,
              'userIdOrEmail': userIdOrEmail,
              'createdDateTime': createdDateTime
            })
    } catch (err) {
    console.error(err.message)
  }
}

// get all notification
//localhost:5000/notifications/
const all = async (req, res) => {
  try {
    const notifications = await pool.query(
      "SELECT * FROM notifications order by createdDateTime desc"
    )
    res.json(notifications[0])
  } catch (err) {
    console.error(err.message)
  }
}

// single notification
//localhost:5000/notifications/:id
const single = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await pool.query(
      "SELECT * FROM notifications WHERE notificationId = ?", [id]
    )
    res.json(notification[0])
  } catch (err) {
    console.error(err.message)
  }
}

// update notification
//localhost:5000/notifications/:id
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, userId } = req.body

    const notification = await pool.query(
      "UPDATE notifications SET content = ?, userIdOrEmail = ? WHERE notificationId = ?",
      [content, userId, id]
    )
    res.json({'notificationId': id,
              'content': content,
              'userIdOrEmail': userId})

  } catch (err) {
    console.error(err.message)
  }
}

// delete notification
//localhost:5000/notifications/:id
const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await pool.query(
      "DELETE FROM notifications WHERE notificationId = ?",
      [id]
    )
    res.json(`Notification id: ${id} is deleted!`)
  } catch (err) {
    console.error(err.message)
  }
}

// get all notifications with user full name
//localhost:5000/notifications/all/userFullname
const allNotificationsWithUserFullname = async (req, res) => {
  try {
    const notifications = await pool.query(
      "SELECT \
      notificationId, content, firstName, lastName, t1.createdDateTime \
      FROM notifications t1 \
      INNER JOIN siteusers t2 \
      ON t1.userIdOrEmail = t2.userId \
      OR t1.userIdOrEmail = t2.email \
      ORDER BY t1.createdDateTime DESC \
      LIMIT 3"
    )
    res.json(notifications[0])
  } catch (err) {
    console.error(err.message)
  }
}
module.exports = {
  all,
  create,
  single,
  update,
  remove,
  allNotificationsWithUserFullname
}