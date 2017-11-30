'use strict';
const Mongoose = require('mongoose');
Mongoose.connect('mongodb://localhost/Nodejs', { useMongoClient: true });
let db = Mongoose.connection;

db.on('error', () => {
    console.log('error de conexión MongoDB')
});
db.once('open', () => {
    console.log('Conectado a MongoDB');
});

module.exports = db;