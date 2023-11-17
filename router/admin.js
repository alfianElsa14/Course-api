const express = require('express')
const { register, login, getAllAdmin, getAdminById } = require('../controllers/adminController')
const { authentication, authorization } = require('../middleware/auth')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.use(authentication)
router.get('/', authorization, getAllAdmin)
router.get('/:id', authorization, getAdminById)

module.exports = router
