const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const category = new Schema({
    name: { type: String, required: true },
    descuento: { type: Number, required: true}
});


category.set('toJSON', { getters: true });

var Category = mongoose.model('category', category);


module.exports = Category;