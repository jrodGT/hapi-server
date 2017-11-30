'use strict';
const mongoose = require('mongoose');
const Hapi = require('hapi');
const server = new Hapi.Server();
const db = require('./database').db;
const jwt = require('jsonwebtoken');
server.connection({
    port: 3000
});
server.ext('onRequest', (request, reply) => {
    if (request.url.path == '/tokenController') {
        return reply.continue();
    } else {
        if (!request.headers.token) {
            return reply({ error: 'Se requiere token' })
        }
        let payload = jwt.verify(request.headers.token, secret, {}, (err, payload) => {
            if (err) {
                return reply({ error: err });
            }
            return reply.continue();
        });
    }
});
//plugins
const plugins = [{
    register: require('inert')
}];

server.register([require('./routes/index')]);

server.register(plugins, (err) => {
    if (err) { return console.log(err); }
    else {
        server.start((err) => {
            if (err) {
                return console.log('error al iniciar servidor', err);
            }
            console.log('servidor hapi iniciado');

        })
    }
});


