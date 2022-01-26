const path = require('path')
const fs = require('fs/promises')
const { unlink } = require('fs/promises')
const {updateAvatar} = require('../../repository/users/index')

require('dotenv').config()

class LocalStorage {
    constructor( file, user) {
        this.userId = user.id
        this.filename = file.filename
        this.filePath = file.path
        this.folderAvatars = process.env.FOLDER_FOR_AVATARS
    }

    async save() { 
        const destination = path.join(this.folderAvatars, this.userId)
        
        await fs.mkdir(destination, { recursive: true })
        await fs.rename(this.filePath, path.join(destination, this.filename))

        const avatarUrl = path.normalize(path.join(this.userId, this.filename))

        await updateAvatar(this.userId, avatarUrl)
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

module.exports = LocalStorage