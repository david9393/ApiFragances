const mongoose = require('mongoose');

mongoose.connect(
    'mongodb://0.0.0.0:27017/', 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Export models
module.exports = {
    User: require('../models/UserModel'),
    Category: require('../models/CategoryModel'),
    Fragance: require('../models/FraganceModel'),
    Marca: require('../models/MarcaModel'),
};