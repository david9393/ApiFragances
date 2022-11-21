const express = require('express');
const marcaService = require('../services/MarcaService');
const router = express.Router();
const { response } = require('../helpers/response');

// Routes
router.post('/create', create);
router.get('/', getAll);


module.exports = router;

function create(req, res, next) {
    marcaService.create(req.body)
        .then(marca => response(res, marca, true, "Se creo correctamente", 201))
        .catch(err => {
            response(res, null, false, err, 400);
        });
}

function getAll(req, res, next) {
    marcaService.getAll()
        .then(marcas => response(res, marcas, true, '', 200))
        .catch(err => {
            response(res, null, false, err, 400);
        });
}