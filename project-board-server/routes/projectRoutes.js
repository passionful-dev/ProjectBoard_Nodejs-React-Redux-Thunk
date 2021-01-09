const express = require('express')
const router = express.Router()
const projectController = require('../controllers/projectController')

router.get('/', projectController.all)
router.post('/', projectController.create)
router.get('/:id', projectController.single)
router.put('/:id', projectController.update)
router.delete('/:id', projectController.remove)

//localhost:5000/projects/all/userFullname
router.get('/all/userFullname', projectController.allProjectsWithUserFullname)

//localhost:5000/projects/:id/user/:userId/userFullname
router.get('/:id/user/:userId/userFullname', projectController.singleProjectWithUserFullname)


module.exports = router