const User = require('../../model/user');


const findById = async (id) => {
    const result = await User.findById(id);
    return result;
}

const findByEmail = async (email) => {
    const result = await User.findOne({ email });
    return result;
}

const findByVerifyToken = async (verificationToken) => {
    const result = await User.findOne({ verificationToken });
    return result;
}

const create = async (body) => {
    const user = new User(body);
    return await user.save();
}

const updateToken = async (id, token) => {
    const result = await User.updateOne({_id: id},{ token });
    return result; 
}

const updateSubscription = async (id, subscription) => {
    const result = await User.updateOne({_id: id},{ subscription: subscription });
    return result; 
}

const updateAvatar = async (id, avatar, idAvatarCloud=null) => {
    const result = await User.updateOne({_id: id},{ avatar, idAvatarCloud});
    return result; 
}

const updateVerify = async (id, status) => {
    const result = await User.updateOne({_id: id},{ verify: status, verificationToken: null});
    return result; 
}

module.exports = {findById, findByEmail, create, updateToken, updateSubscription, updateAvatar, findByVerifyToken, updateVerify};