'use strict';
const controllers = require('../controllers');

module.exports = (options) => {
    return [
        {
            method: 'GET',
            path: '/',
            config: {
                handler: (request, reply) => {
                    reply('Hola mundo');
                }
            }
        },
        {
            method: 'GET',
            path: '/test',
            config: {
                handler: (request, reply) => {
                    reply('Hola mundo test');
                }

            }

        },
        {
            method: 'GET',
            path: '/testController',
            config: {
                handler: controllers.tvController.getArray
            }

        },
        {
            method: 'GET',
            path: '/testController/{id}',
            config: {
                handler: controllers.tvController.getById
            }

        },
        {
            method: 'POST',
            path: '/testController',
            config: {
                handler: controllers.tvController.postArray
            }

        },
        {
            method: 'POST',
            path: '/tokenController',
            config: {
                handler: controllers.tokenController.crearToken
            }

        },
        {
            method: 'GET',
            path: '/tokenController/{token}',
            config: {
                handler: controllers.tokenController.descifrarToken
            }

        }

    ]
}