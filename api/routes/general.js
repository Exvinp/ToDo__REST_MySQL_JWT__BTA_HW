const express = require('express')

const mainController = require('../controllers/mainController')
const isAuth = require('../middlewares/isAuth')
const validationController = require('../middlewares/validations/validation')

const router = express.Router()

router.post('/', mainController.login)
router.put('/', validationController.user, mainController.signup)
router.patch('/', isAuth, mainController.dispatcher)

module.exports = router
