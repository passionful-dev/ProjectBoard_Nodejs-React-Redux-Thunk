const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/', userController.all)
router.post('/', userController.create)
router.get('/:id', userController.single)
router.put('/:id', userController.update)
router.delete('/:id', userController.remove)

//localhost:5000/users/all/signIn
router.post('/all/signin', userController.signIn)

//localhost:5000/users/all/signOut
router.get('/all/signOut', userController.signOut)

module.exports = router