const express = require('express')
const { register, login, getAllUsers, changePasword, forgotPassword } = require('../controllers/userController')
const { authentication } = require('../middleware/auth')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.use(authentication)
router.get('/', getAllUsers)
router.put('/changePassword', changePasword)

module.exports = router
