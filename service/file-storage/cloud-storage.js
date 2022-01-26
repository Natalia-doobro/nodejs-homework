const cloudinary = require('cloudinary').v2;
const { promisify } = require('util')
const { unlink } = require('fs/promises')
const {updateAvatar} = require('../../repository/users/index')
const { CLOUD_FOLDER_AVATARS } = require("../../lib/constants")

require('dotenv').config()

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET,
  secure: true
});


class CloudStorage {
    constructor( file, user) {
        this.userId = user.id
        this.filePath = file.path
        this.idAvatarCloud = user.idAvatarCloud
        this.folderAvatars = CLOUD_FOLDER_AVATARS
        this.uploadCloud = promisify(cloudinary.uploader.upload)
    }

    async save() {
        const {public_id: returneIdAvatar, secure_url: avatarUrl} =await this.uploadCloud(this.filePath, {public_id: this.idAvatarCloud, folder: this.folderAvatars})
        const newIdAvatarCloud = returneIdAvatar.replace(`${this.folderAvatars}/`, '')

        await updateAvatar(this.userId, avatarUrl, newIdAvatarCloud);
        await this.remuveUploadFile(this.filePath);

        return avatarUrl
    }

    async remuveUploadFile(filePath) {
        try {
            await unlink(filePath);
        } catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = CloudStorage