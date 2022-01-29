const { Router } = require('express')
const {signup, login, logout, current ,usersSubscription} = require('../../../controllers/auth/index')
const {registrationValidation, loginValidation } = require('../../../middlewares/validation/userValidation')
const guard = require('../../../middlewares/guard/guard')
const router = new Router()

router.post('/', guard, usersSubscription)
router.post('/signup', registrationValidation, signup)
router.post('/login',loginValidation,  login)
router.post('/logout', guard, logout)
router.post('/current', guard, current)

module.exports = router 