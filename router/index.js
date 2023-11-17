const express = require('express')
const router = express.Router()
const userRouter = require('./user')
const adminRouter = require('./admin')
const courseRouter = require('./course')
const { authentication } = require('../middleware/auth')

router.use('/users', userRouter)
router.use('/admins', adminRouter)
router.use('/courses', authentication, courseRouter)

module.exports = router
