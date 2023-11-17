const express = require('express')
const { getAllCourse, getCourseById, addCourse, editCourse, deleteCourse, getAllCourseByCategory } = require('../controllers/courseController')
const { authentication, authorization, adminAuthorization } = require('../middleware/auth')
const router = express.Router()

router.get('/', getAllCourse)
router.get('/category', getAllCourseByCategory)
router.post('/addCourse', authorization, addCourse)
router.put('/editCourse/:id', adminAuthorization, editCourse)
router.delete('/deleteCourse/:id', adminAuthorization, deleteCourse)
router.get('/:id', getCourseById)

module.exports = router
