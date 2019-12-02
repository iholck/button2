require('rootpath')();
const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
// temporarily removed for development
app.use(jwt());

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/data', require('./data/data.controller'));

// global error handler
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.BACKEND_PORT || 80) : 4000;
https.createServer({
    key: fs.readFileSync('/run/secrets/server.key'),
    cert: fs.readFileSync('/run/secrets/server.cert')
  }, app) .listen(port, function () {
    console.log('Server listening on port ' + port);
});
