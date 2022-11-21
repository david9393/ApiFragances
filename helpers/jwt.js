const jwt = require('jsonwebtoken');
const { response } = require('./response');

module.exports = {
    validateJwt
};

function validateJwt(req, res, next)  {
    const token = req.headers.authorization.split(' ')[1];
 
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {      
        if (err) {
          return   response(res, null, false, "usuario no autorizado", 401);  
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
        response(res, null, false, "token no proveido", 401);
    }
 };