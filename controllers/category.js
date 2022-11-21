const express = require('express');
const categoryService = require('../services/CategoryService');
const router = express.Router();
const { response } = require('../helpers/response');

// Routes
router.post('/create', create);
router.get('/', getAll);


module.exports = router;

function create(req, res, next) {
    categoryService.create(req.body)
        .then(user => response(res, user, true, "Se creo correctamente", 201))
        .catch(err => {
            response(res, null, false, err, 400);
        });
}

function getAll(req, res, next) {
    categoryService.getAll()
        .then(users => response(res, users, true, '', 200))
        .catch(err => {
            response(res, null, false, err, 400);
        });
}