const express = require('express');
const fraganceService = require('../services/FraganceService');
const router = express.Router();
const { response } = require('../helpers/response');

// Routes
router.post('/create', create);
router.get('/', getAll);


module.exports = router;

function create(req, res, next) {
    fraganceService.create(req.body)
        .then(user => response(res, user, true, "Se creo correctamente", 201))
        .catch(err => {
            response(res, null, false, err, 400);
        });
}

function getAll(req, res, next) {
    fraganceService.getAll(req.body)
        .then(users => response(res, users, true, '', 200))
        .catch(err => {
            response(res, null, false, err, 400);
        });
}