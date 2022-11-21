const db = require('../database/db');
const Fragance = db.Fragance;

module.exports = {
    getAll,
    create,
};

async function getAll(params) {
    return await Fragance.find( _applyConditions(params));
}

async function create(userParam) {
    // validate
    if (await Fragance.findOne({ name: userParam.name })) {
        throw 'Name "' + userParam.name + '" is already taken';
    }

    const fragance = new Fragance(userParam);

    await fragance.save();
    return fragance;
}

const _applyConditions = (params) => {

    let filters={}

    if (params.categoryName!=null) {
        let categoryName = { 'category.name': params.categoryName };
        filters = {...filters, ...categoryName};
    }

    if (params.marcaName!=null) {
        let marcaName = { 'marca.name': params.marcaName };
        filters = {...filters, ...marcaName};
    }

    if (params.genero!=null) {
        let genero = { genero: params.genero };
        filters = {...filters, ...genero};
    }

    if (params.minPrice!=null && params.maxPrice!=null) {
        let filterPrice = { price:{$gte:params.minPrice , $lte:params.maxPrice} };
        filters = {...filters, ...filterPrice};
    }

    return filters 
}