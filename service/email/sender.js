const sgMail = require('@sendgrid/mail');
// const nodemailer = require('nodemailer');
require('dotenv').config()

class SenderSendgrid { 
    async send(msg) {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        return await sgMail.send({...msg, from: process.env.SENDER_MAIL })
    }
}
// class SennderNodemailer { 
//     async send(msg) {
//         const config = {
//             host: 'smtp.meta.ua',
//             port: 465,
//             secure: true,
//             auth: {
//                 user: process.env.USER_NODEMAILER,
//                 pass: process.env.PASSWORD_NODEMAILER,
//             }
//         }

//         const transporter = nodemailer.createTransport(config);

//         return await transporter.sendMail({...msg, from: process.env.USER_NODEMAILER })
//     }
// }

module.exports = SenderSendgrid