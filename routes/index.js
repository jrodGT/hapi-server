'use strict'
const routes = require('./router');

exports.register = (server, options, next) => {
    server.route(routes(options));
    next();
}
exports.register.attributes = {
    pkg: require('../package.json')
}