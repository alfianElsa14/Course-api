const { compare } = require('../helper/bcrypt');
const { sign } = require('../helper/jwt');
const { handleInternalError, handleValidationError, handleExistingRecordError, handleLoginError, handleNotFoundError } = require('../middleware/errorHandler');
const { Admin, Course } = require('../models')
const joi = require('joi');

exports.register = async (req, res) => {
    try {
        const newAdmin = req.body;

        const schema = joi.object({
            username: joi.string().required(),
            email: joi.string().required(),
            password: joi.string().min(6).required()
        })

        const { error } = schema.validate(newAdmin)

        if (error) {
            return handleValidationError(res, error)
        }

        const existingUser = await Admin.findOne({
            where: {
                email: newAdmin.email
            }
        });

        if (existingUser) {
            return handleExistingRecordError(res, 'Email sudah terdaftar, coba ganti dengan nama lain')
        }

        const result = await Admin.create({
            username: newAdmin.username,
            email: newAdmin.email,
            password: newAdmin.password
        })

        res.status(201).json({ message: 'success', result })
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.login = async (req, res) => {
    try {
        const dataLogin = req.body

        const schema = joi.object({
            email: joi.string().required(),
            password: joi.string().required()
        })

        const { error } = schema.validate(dataLogin)

        if (error) {
            return handleValidationError(res, error)
        }

        let dataAdmin = await Admin.findOne({
            where: {
                email: dataLogin.email
            }
        })

        if (!dataAdmin) {
            return handleNotFoundError(res, 'Admin')
        }

        let comparePass = compare(dataLogin.password, dataAdmin.password)

        if (!comparePass) {
            return handleLoginError(res)
        }

        const { id, email, role } = dataAdmin

        let access_token = sign({ id, email, role })
        let adminEmail = dataAdmin.email

        res.status(201).json({ adminEmail, access_token })
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.getAllAdmin = async (req, res) => {
    try {
        const dataAdmin = await Admin.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: [
                {
                    model: Course,
                }
            ]
        })
        res.status(200).json(dataAdmin)
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.getAdminById = async (req, res) => {
    try {
        const { id } = req.params
        const dataAdmin = await Admin.findOne({
            where: {
                id
            },
            include: [
                {
                    model: Course,
                    attributes: {
                        exclude: ["createdAt", "updatedAt"]
                    }
                }
            ]
        });

        if (!dataAdmin) {
            return handleNotFoundError(res, 'Admin');
        }
        res.status(200).json(dataAdmin)
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }

}