const jwt = require('jsonwebtoken');
const { findByEmail, create, updateToken, updateSubscription } = require('../../repository/users/index')
require('dotenv').config()

const sicretKey = process.env.JWT_SECRET_KEY;

class AuthService {
    async isUserExist(email) {
        const user = await findByEmail(email)
        return !!user
    }

    async create(body) {
        const {id, name, email, subscription, avatarURL, verificationToken} = await create(body);
        return { id, name, email, subscription, avatarURL, verificationToken}
    }

    async getUser(email, password ) {
        const user = await findByEmail(email);
        const isValidPassword = await user?.isValidPassword(password);

        if (!isValidPassword || !user?.verify) {
            return null;
        }
        return user;
    }

    getToken(user) {
        const id = user.id;
        const payload = {id}
        const token = jwt.sign(payload, sicretKey, {expiresIn: '8h'})
        return token;
    }

    async setToken(id, token) {
        await updateToken(id, token);
    }

    async setSubscription(id, subscription) {
        await updateSubscription(id, subscription);
    }
 }

module.exports = AuthService