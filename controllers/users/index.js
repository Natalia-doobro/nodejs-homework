const { findByVerifyToken, updateVerify, findByEmail } = require('../../repository/users/index');
const { HttpCode, MESSAGE } = require('../../lib/constants');
const { EmailService, SenderSendgrid } = require('../../service/email/index')
// eslint-disable-next-line no-unused-vars
const { UploadFileStorage, LocalFileStorage, CloudFileStorage } = require('../../service/file-storage/index')


const uploadAvatar = async (req, res, next) => {
    const uploadService = new UploadFileStorage(
        CloudFileStorage,  // LocalFileStorage, 
        req.file,
        req.user)
    
    
    const urlAvatar = await uploadService.updateAvatar()

    if (!urlAvatar) {
        return res
            .status(HttpCode.UNAUTHORIZED)
            .json({ 
                status: 'Error',
                code: `${HttpCode.CONFLICT} Unauthorized`,
                data: {"message": MESSAGE.LOGIN_UNAUTHORIZED} 
            });
    }

    res.status(HttpCode.OK).json({ status: 'success', code: `${HttpCode.OK} OK`, data:{ "avatarURL": urlAvatar }});
}

const verifyUser = async (req, res, next) => {
    const verifyToken = req.params.verifyToken;
    const userFromToken = await findByVerifyToken(verifyToken);

    if( userFromToken ){
        await updateVerify(userFromToken.id, true);

       return res.status(HttpCode.OK).json({ status: 'success', code: `${HttpCode.OK} OK`, data:{ message: 'Verification successful' }});
    }
   
    res.status(HttpCode.NOT_FOUND)
        .json({ 
            status: 'Error',
            code: `${HttpCode.NOT_FOUND} Not Found`,
            data: {"message": MESSAGE.ERROR} 
        }); 
}

const repeatEmailForVerifyUser = async (req, res, next) => {
    const {email} = req.body
    const user = await findByEmail(email)

    if (user) {
        const {email, name, verificationToken} = user
        const emailService = new EmailService(process.env.NODE_ENV,new SenderSendgrid());

        const isSend = await emailService.sendVerifyEmail(email, name, verificationToken);

        if(isSend){
          return res.status(HttpCode.OK).json({ status: 'success', code: `${HttpCode.OK} OK`, data:{ "message": "Verification email sent" }});
        }

        return res.status(HttpCode.BAD_REQUEST).json({ status: 'success', code: `${HttpCode.BAD_REQUEST} Bad Request`, data:{ message: "Verification has already been passed" }});
    }

    res.status(HttpCode.NOT_FOUND).json({ status: 'Error', code: `${HttpCode.NOT_FOUND} Not Found`, data: {"message": MESSAGE.ERROR} });
}

module.exports = {uploadAvatar, verifyUser, repeatEmailForVerifyUser}