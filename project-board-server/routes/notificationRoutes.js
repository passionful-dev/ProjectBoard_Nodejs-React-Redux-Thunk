const express = require('express')
const router = express.Router()
const notificationController = require('../controllers/notificationController')

router.get('/', notificationController.all)
router.post('/', notificationController.create)
router.get('/:id', notificationController.single)
router.put('/:id', notificationController.update)
router.delete('/:id', notificationController.remove)

//localhost:5000/notifications/all/userFullname
router.get('/all/userFullname', notificationController.allNotificationsWithUserFullname)


module.exports = router