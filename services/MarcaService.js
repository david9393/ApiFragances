const db = require('../database/db');
const Marca = db.Marca;

module.exports = {
    getAll,
    create,
};

async function getAll() {
    return await Marca.find();
}

async function create(marcaParam) {
    // validate
    if (await Marca.findOne({ name: marcaParam.name })) {
        throw 'Name "' + marcaParam.name + '" is already taken';
    }

    const marca = new Marca(marcaParam);

    await marca.save();
    return marca;
}