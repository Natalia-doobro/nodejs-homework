const Jimp = require('jimp');

class FileStorage {
    constructor(Storage, file, user) {
        this.storage = new Storage(file, user)
        this.pathFile = file.path
    }

    async updateAvatar() { 
        await this.transformAvatar(this.pathFile)
        const userUrlAvatar = await this.storage.save()
        return userUrlAvatar
    }
    
    async transformAvatar(pathFile) {
        const pic = await Jimp.read(pathFile)
        await pic
            .autocrop()
            .cover(250, 250, Jimp.HORIZONTAL_ALIGN_LEFT | Jimp.VERTICAL_ALIGN_TOP)
            .writeAsync(pathFile)
    }
}

module.exports = FileStorage