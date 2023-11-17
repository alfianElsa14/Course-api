const { handleInternalError, handleNotFoundError, handleValidationError, handleExistingRecordError } = require('../middleware/errorHandler');
const { Course, Admin } = require('../models')
const { sendCourseUpdatedEmail } = require('../helper/emailServices');
const joi = require('joi');

exports.getAllCourse = async (req, res) => {
    try {
        const coursesData = await Course.findAll()
        res.status(200).json(coursesData)
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.getAllCourseByCategory = async (req, res) => {
    try {
        const { category } = req.query

        if (!category) {
            coursesData = await Course.findAll();
        }

        let coursesData = await Course.findAll({
            where: {
                category: category,
            },
        })

        if (coursesData.length === 0) {
            return handleNotFoundError(res, 'Category');
        }

        res.status(200).json({totalCourse: coursesData.length, coursesData});
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.getCourseById = async (req, res) => {
    try {
        const { id } = req.params

        const dataCourse = await Course.findOne({
            where: {
                id
            },
            include: [
                {
                    model: Admin,
                    attributes: {
                        exclude: ["createdAt", "updatedAt", "email", "role", "email", "id", "password"]
                    }
                }
            ]
        })
        if (!dataCourse) {
            return handleNotFoundError(res, 'Course');
        }
        res.status(200).json(dataCourse)
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.addCourse = async (req, res) => {
    try {
        const newCourse = req.body;

        const schema = joi.object({
            title: joi.string().required(),
            description: joi.string().min(10).required(),
            category: joi.string().required()
        })

        const { error } = schema.validate(newCourse)

        if (error) {
            return handleValidationError(res, error)
        }

        const existingCourse = await Course.findOne({
            where: {
                title: newCourse.title
            }
        });

        if (existingCourse) {
            return handleExistingRecordError(res, 'Course dengan title ini sudah di buat sebelumnya');
        }

        const result = await Course.create({
            title: newCourse.title,
            description: newCourse.description,
            category: newCourse.category,
            adminId: req.user.id
        })

        res.status(201).json({ message: 'sukses menambahkan course', result })
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.editCourse = async (req, res) => {
    try {
        const { id } = req.params
        const newCourse = req.body;
        const courseData = await Course.findByPk(id)

        if (!courseData) {
            return handleNotFoundError(res, 'Course');
        }

        const schema = joi.object({
            title: joi.string().required(),
            description: joi.string().min(10).required(),
            category: joi.string().required()
        })

        const { error } = schema.validate(newCourse)

        if (error) {
            return handleValidationError(res, error)
        }

        const existingCourse = await Course.findOne({
            where: {
                title: newCourse.title
            }
        });

        if (existingCourse) {
            return handleExistingRecordError(res, 'Course dengan title ini sudah di buat sebelumnya');
        }


        const result = await Course.update({
            title: newCourse.title,
            description: newCourse.description,
            category: newCourse.category,
        }, {
            where: {
                id,
            }
        })

        const emailAdmin = await sendCourseUpdatedEmail(req.user.email, id);
        console.log(req.user.email, "<<<<<< email admin");
        res.status(200).json({ message: 'Course berhasil di ubah', newCourse })
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.deleteCourse = async (req, res) => {
    try {
        const { id } =  req.params
        const courseData = await Course.findByPk(id)

        if (!courseData) {
            return handleNotFoundError(res, 'Course');
        }

        const response = await Course.destroy({
            where: {
                id
            }
        })

        res.status(200).json({message: 'Course telah di hapus', courseData})
    } catch (error)  {
         console.log(error);
        return handleInternalError(res)
    }
}

