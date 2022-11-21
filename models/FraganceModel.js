const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const category = new Schema({
    name: { type: String, required: true },
    descuento: { type: Number, required: true}
});

const marca = new Schema({
    name: { type: String, required: true },
    descuento: { type: Number, required: true}
});

const fragance = new Schema({
    name: { type: String, required: true},
    price: { type: Number, required: true },
    createdDate: { type: Date, default: Date.now },
    genero: { type: String, required: true},
    images: { type: [String], required: true},
    category: { type: category, required: true},
    tamano :{ type: String, required: true },
    marca: { type:marca, required: true}
});

fragance.set('toJSON', { getters: true });

var Fragance = mongoose.model('fragance', fragance);


module.exports = Fragance;