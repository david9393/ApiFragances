const db = require('../database/db');
const Category = db.Category;

module.exports = {
    getAll,
    create,
};

async function getAll() {
    return await Category.find();
}

async function create(userParam) {
    // validate
    if (await Category.findOne({ name: userParam.name })) {
        throw 'Name "' + userParam.name + '" is already taken';
    }

    const category = new Category(userParam);

    await category.save();
    return category;
}