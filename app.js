const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const {HttpCode, MESSAGE} = require('./lib/constants')
require('dotenv').config()

const contactsRouter = require('./routes/api/contact/contacts')
const authRouter = require('./routes/api/auth/auth')
const userRouter = require('./routes/api/users/users')

const app = express()
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(express.static(process.env.FOLDER_FOR_AVATARS))
app.use(cors())
app.use(express.json())
// app.use(express.urlencoded({extended: false}))

app.use('/api/users', authRouter)
app.use('/api/users', userRouter)
app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(HttpCode.NOT_FOUND).json({status: 'error', code: HttpCode.NOT_FOUND , message: MESSAGE.ERROR})
})

app.use((err, req, res, next) => {
  res.status(HttpCode.INTERNAL_SERVER_ERROR).json({status: 'fail', code: HttpCode.INTERNAL_SERVER_ERROR,  message: err.message })
})

module.exports = app
