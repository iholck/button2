//const config = require('config.json');
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}:27017/${process.env.DBNAME}`, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true  });
mongoose.Promise = global.Promise;

module.exports = {
    Data: require('../data/data.model')
};