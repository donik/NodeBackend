let dbConfig = require('../config/db');
let mongose = require('mongoose');
let ErrorModel = require('./errorModel');
let Schema = mongose.Schema;

mongose.connect(dbConfig.url, {
    useMongoClient: true
});

let books = new Schema({
    title: {type: String, required: [true, 'Необходимо ввести название книги']},
    short_description: {type: String, required: true},
    full_description: {type: String, required: true},
    date: {type: Date, default: Date.now()}
});

let errors = (error) => {
    return ErrorModel.model(500, error.name)
};


module.exports = mongose.model('books', books);
module.exports.errors = errors;
