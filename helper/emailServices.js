const nodemailer = require('nodemailer');
const { handleInternalError } = require('../middleware/errorHandler');
const emailAdmin = process.env.EMAIL_ADMIN
const passwordAdmin = process.env.PASSWORD_ADMIN

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailAdmin,
    pass: passwordAdmin,
  },
});

exports.sendCourseUpdatedEmail = async (adminEmail, courseId) => {
  try {
    const mailOptions = {
      from: emailAdmin,
      to: adminEmail,
      subject: 'Course Updated',
      text: `Course with ID ${courseId} has been updated successfully.`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.log(error);
    return handleInternalError(res)
  }
};
