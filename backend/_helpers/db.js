const config = require('config.json');
const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}:27017/${process.env.DBNAME}`, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true  });
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../users/user.model'),
    Data: require('../data/data.model')
};