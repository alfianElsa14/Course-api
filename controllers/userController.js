const { compare, hash } = require('../helper/bcrypt');
const { sign } = require('../helper/jwt');
const { handleInternalError, handleValidationError, handleExistingRecordError, handleLoginError, handleNotFoundError } = require('../middleware/errorHandler');
const { User } = require('../models')
const joi = require('joi');

exports.register = async (req, res) => {
    try {
        const newUser = req.body;

        const schema = joi.object({
            username: joi.string().required(),
            email: joi.string().required(),
            password: joi.string().min(6).required()
        })

        const { error } = schema.validate(newUser)

        if (error) {
            return handleValidationError(res, error)
        }

        const existingUser = await User.findOne({
            where: {
                email: newUser.email
            }
        });

        if (existingUser) {
            return handleExistingRecordError(res, 'Email sudah terdaftar, coba ganti dengan nama lain')
        }

        const result = await User.create({
            username: newUser.username,
            email: newUser.email,
            password: newUser.password
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

        let dataUser = await User.findOne({
            where: {
                email: dataLogin.email
            }
        })

        if(!dataUser) {
            return handleNotFoundError(res, 'User')
        }

        let comparePass = compare(dataLogin.password, dataUser.password)

        if (!comparePass) {
            return handleLoginError(res)
        }

        const { id, email, role } = dataUser

        let access_token = sign({ id, email, role })
        let userEmail = dataUser.email

        res.status(201).json({ userEmail, access_token })
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const dataUser = await User.findAll()
        res.status(200).json(dataUser)
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.changePasword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const userId = req.user.id;
        const user = await User.findByPk(userId);

        const isPasswordValid = compare(oldPassword, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Password lama tidak valid' });
        }

        const hashedPassword = hash(newPassword);
        user.password = hashedPassword;

        await user.save();

        res.status(200).json({ message: 'Password berhasil diubah' });
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

