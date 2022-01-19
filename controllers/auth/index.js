const {HttpCode, MESSAGE} = require('../../lib/constants')
const AuthService = require('../../service/auth/index')
const authService = new AuthService();

const signup = async (req, res, _next) => {
    const { email } = req.body;
    const isUserExist = await authService.isUserExist(email);

    if (isUserExist) {
        return res
            .status(HttpCode.CONFLICT)
            .json({ 
                status: 'Error',
                code: `${HttpCode.CONFLICT} Conflict`,
                data: {"message": MESSAGE.CONFLICT_EMAIL} 
            });
    }

    const data = await authService.create(req.body);
    res.status(HttpCode.CREATED).json({ status: 'success', code: `${HttpCode.CREATED} Created`, data:  {user: data}});
}

const login = async (req, res, _next) => {
    const { email, password } = req.body;
    const user = await authService.getUser(email, password);

    if (!user) {
        return res
            .status(HttpCode.UNAUTHORIZED)
            .json({ 
                status: 'Error',
                code: `${HttpCode.CONFLICT} Unauthorized`,
                data: {"message": MESSAGE.LOGIN_UNAUTHORIZED} 
            });
    }

    const token = authService.getToken(user);
    await authService.setToken(user.id, token);

    const {subscription } = user;


    res.status(HttpCode.OK).json({ status: 'success', code: `${HttpCode.OK} OK`, data:  {token: token, user: { email: email , subscription }}});

}

const logout = async (req, res, _next) => {
    await authService.setToken( req.user.id, null);

    res.status(HttpCode.NO_CONTENT).json({ status: 'success', code: `${HttpCode.NO_CONTENT} No Content`});
}

const current = async (req, res, _next) => {
    const {id, token, email , subscription} = req.user
    await authService.setToken(id, token);

    res.status(HttpCode.OK).json({ status: 'success', code: `${HttpCode.OK} OK`, data: { email , subscription }});
}

const usersSubscription = async (req, res, _next) => {
    const {id, token, subscription} = req.body
    await authService.setToken(id, token);

    await authService.setSubscription(id, subscription);

    res.status(HttpCode.OK).json({ status: 'success', code: `${HttpCode.OK} OK`, data: { id, token, subscription }});
}


module.exports={signup, login, logout, current, usersSubscription}