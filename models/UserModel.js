const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    email: {
        type: String, required: true,
        trim: true, unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: { type: String },
    firstName: { type: String, required: true},
    lastName: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
});

schema.set('toJSON', { getters: true });

var User = mongoose.model('user', schema);


module.exports = User;