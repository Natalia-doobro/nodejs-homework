const { Router } = require('express')
const {uploadAvatar} = require('../../../controllers/users/index')
const guard = require('../../../middlewares/guard/guard')
const upload = require('../../../middlewares/upload/upload')

const router = new Router()

router.patch('/avatars', guard, upload.single('avatar'), uploadAvatar)


module.exports = router