const bcrypt = require('bcryptjs');
const db = require('../database/db');
const jwt = require('jsonwebtoken');
const User = db.User;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    login,
};

async function getAll() {
    return await User.find().select('-password');
}

async function getById(id) {
    return await User.findById(id).select('-password');
}

async function create(userParam) {
    // validate
    if (await User.findOne({ email: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();
    user.password=null;
    return user;
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.email !== userParam.email && await User.findOne({ email: userParam.email })) {
        throw 'Username "' + userParam.email + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.password = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
    user.password=null;
    return user
}

async function _delete(id) {
    const user = await User.findById(id);

    if (!user)
        throw 'User not found';

    await User.findByIdAndRemove(id);
}
async function login({ email, password }) {
    const user = await User.findOne({ email });
    if (user && user.password && bcrypt.compareSync(password, user.password)) {
        const payload = { sub: user.id };
        const token = createJwtToken(payload);
        return {
            token
        };
    }
}

function createJwtToken(payload) {
    let tokenLife = parseInt(process.env.JWT_TOKEN_LIFE);
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: tokenLife });
}