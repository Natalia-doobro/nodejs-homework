const { HttpCode, MESSAGE } = require('../../lib/constants');
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

module.exports = {uploadAvatar}