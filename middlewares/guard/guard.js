const jwt = require('jsonwebtoken');
const { findById } = require('../../repository/users/index')
const {HttpCode, MESSAGE} = require('../../lib/constants')
require('dotenv').config()

const sicretKey = process.env.JWT_SECRET_KEY;

const verifyToken = (token) => {
    try {
        const verify = jwt.verify(token, sicretKey);
        return !!verify;
    } catch (e) {
        return false;
    }
}

const guard = async (req, res, next) => {
    const token = req.get('Authorization')?.split(' ')[1];
    const isValidToken = verifyToken(token);

    if (!isValidToken) {
        return res
            .status(HttpCode.UNAUTHORIZED)
            .json({ 
                status: 'Error',
                code: `${HttpCode.CONFLICT} Unauthorized`,
                data: {"message": MESSAGE.AUTHORIZATION} 
            });
    }

    const payload = jwt.decode(token);
    const user = await findById(payload.id);

    if (!user || user.token !== token ) {
        return res
            .status(HttpCode.UNAUTHORIZED)
            .json({ 
                status: 'Error',
                code: `${HttpCode.CONFLICT} Unauthorized`,
                data: {"message": MESSAGE.AUTHORIZATION} 
            });
    }

    req.user = user;

    next();
}

module.exports = guard;