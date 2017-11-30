'use strict';
const mongoose = require('mongoose');
const TVShowSchema = new mongoose.Schema({
    titulo: { type: String },
    anio: { type: Number },
    pais: { type: String }
});
module.exports = mongoose.model('TVShow', TVShowSchema);
