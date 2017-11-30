'use strict';
const obj = {};
const mongoose = require('mongoose');
const TVShow = require('../models/TvShow');

obj.getArray = (request, reply) => {
    TVShow.find()
        .then(tvShows => reply(tvShows))
        .catch(err => reply({ error: err })
        );
};

obj.extArray = (request, reply) => {
    let requestOptions = {
        method: 'GET',
        uri: 'http://192.168.43.2:3000/test',
        headers: {
            'token': '12345',
            'Content-Type': 'application/json'
        },
        body: {},
        json: true
    };
    rp(requestOptions)
        .then(result => reply(result))
        .catch(error => reply(error));
}

obj.extCreate = (request, reply) => {
    let rqOp = {
        method: 'POST',
        uri: 'http://192.168.43.2:3000/test',
        headers: {
            'token': request.headers.token,
            'Content-Type': 'application/json'
        },
        body: request.body,
        json: true
    }

    rp(rqOp)
        .then(result => reply(result))
        .catch(error => reply(error));
}

obj.postArray = (request, reply) => {
    let data = new TVShow(
        {
            titulo: request.payload.titulo,
            anio: request.payload.anio,
            pais: request.payload.pais
        });
    data.save()
        .then(result => reply(result))
        .catch(err => reply({ error: err })
        );
}

obj.getById = (request, reply) => {
    TVShow.findById(request.params.id)
        .then(result => (result ? reply(result) : reply({ error: `Show: ${request.params.id},no encontrado}` })))
        .catch(err => reply({ error: err }));
}

obj.deleteTvShow = (request, reply) => {
    TVShow.findByIdAndRemove(request.params.id)
        .then(result => reply(result))
        .catch(err => reply({ error: err }));
}

obj.updateTvShow = (request, reply) => {
    TVShow.findByIdAndUpdate(request.params.id, request.body)
        .then(result => reply(result))
        .catch(err => reply({ error: error }));
}

module.exports = obj;
