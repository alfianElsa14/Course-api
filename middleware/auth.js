const { decodeToken } = require("../helper/jwt")
const { handleInternalError, handleNotFoundError } = require("./errorHandler")
const { Course } = require('../models')

exports.authentication = async (req, res, next) => {
    try {
        const bearerToken = req.headers.authorization

        if (!bearerToken) {
            return res.status(403).json({ message: 'Invalid Token' })
        }

        const access_token = bearerToken.replace('Bearer ', '')
        const decode = decodeToken(access_token)
        req.user = decode

        next()
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.authorization = async (req, res, next) => {
    try {
        const role = req.user.role
        if (role !== "admin") {
            return res.status(403).json({ message: "akses tidak di izinkan" })
        }
        
        next()
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

exports.adminAuthorization = async (req, res, next) => {
    try {
        const { id } = req.params
        const role = req.user.role
        const adminId = req.user.id
        const courseData = await Course.findByPk(id)

        if (!courseData) {
            return handleNotFoundError(res, 'Course');
        }

        if (role !== "admin" || adminId !== courseData.adminId) {
            return res.status(403).json({ message: "akses tidak di izinkan" })
        }

        next()
    } catch (error) {
        console.log(error);
        return handleInternalError(res)
    }
}

