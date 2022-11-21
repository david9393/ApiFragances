const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const marca = new Schema({
    name: { type: String, required: true },
    descuento: { type: Number, required: true}
});


marca.set('toJSON', { getters: true });

var Marca = mongoose.model('marca', marca);


module.exports = Marca;