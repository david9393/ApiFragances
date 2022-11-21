const express = require('express');
const userService = require('../services/UserService');
const router = express.Router();
const { response } = require('../helpers/response');
const jwt = require('../helpers/jwt');

// Routes
router.post('/create', create);
router.post('/login', login); 
router.get('/', getAll);
router.get('/current', getCurrent);
router.get('/:id', getById);
router.put('/:id',jwt.validateJwt, update);
router.delete('/:id', _delete);

module.exports = router;

function create(req, res, next) {
    userService.create(req.body)
        .then(user => response(res, user, true, "Se creo correctamente", 201))
        .catch(err => {
            response(res, null, false, err, 400);
        });
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => response(res, users, true, '', 200))
        .catch(err => {
            response(res, null, false, err, 400);
        });
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => {
            response(res, null, false, err, 400);
        });
}

function getById(req, res, next) {
    const id = req.params.id;

    userService.getById(id)
        .then(user =>  user ?
                                response(res, user, true) :
                                response(res, null, false, 'User not Found', 404))
        .catch(err => {
            response(res, null, false, err, 400)
        });
}

function update(req, res, next) {
    console.log(req.params.id)
    userService.update(req.params.id, req.body)
        .then((user) => response(res, user, true))
        .catch(err => {
            response(res, null, false, err, 400);
        });
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({id: req.params.id}))
        .catch(err => {
            response(res, null, false, err, 400);
        });
}

function login(req, res, next) {
    userService.login(req.body)
        .then(user => {
            if (user) {
                response(res, user, true);
            } else {
                response(res, null, false, MESSAGE_USER_LOGGED_FAIL, 400);
            }
        })
        .catch(err => {
            response(res, null, false, err, 400);
        });
}