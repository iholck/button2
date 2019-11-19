
const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.dataConnectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {
    Data: require('../data/data.model')
};