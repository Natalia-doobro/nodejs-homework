const { Router } = require('express')
const {uploadAvatar, verifyUser, repeatEmailForVerifyUser} = require('../../../controllers/users/index')
const guard = require('../../../middlewares/guard/guard')
const upload = require('../../../middlewares/upload/upload')
const { emailValidation } = require('../../../middlewares/validation/userValidation')

const router = new Router()

router.patch('/avatars', guard, upload.single('avatar'), uploadAvatar)
router.get('/verify/:token', verifyUser)
router.get('/verify',emailValidation, repeatEmailForVerifyUser)

module.exports = router