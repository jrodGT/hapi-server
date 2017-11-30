const jwt = require('jsonwebtoken');
const moment = require('moment');
let secret = 'xxx';

const objToken = {}

objToken.crearToken = (request, reply) => {
    let pyl = request.payload;
    pyl.iat = moment().unix();
    pyl.exp = moment().add(30, 'm').unix();
    let token = jwt.sign(pyl, secret, {}, (err, token) => {
        if (err) {
            return reply({ error: err });
        }
        reply({ token });
    });

}

objToken.descifrarToken = (request, reply) => {
    let pyl = jwt.verify(request.params.token, secret, {}, (err, pyl) => {
        if (err) {
            return reply({ error: err });
        }
        if (moment().unix() <= pyl.exp) {
            return reply({ pyl });
        }
        return reply({ error: 'Token expirado' });
    });
}

objToken.validarTokenMidd = (request, reply) => {
    if (!request.headers.token) {
        return reply({ error: 'Se requiere token' });
    }
    let pyl = jwt.verify(request.headers.token, secret, {}, (err, pyl) => {
        if (err) {
            return reply({ error: err });
        }
        return next();
    });
}
module.exports = objToken;