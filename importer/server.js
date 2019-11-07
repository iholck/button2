const environment = process.env.NODE_ENV || 'dev';
if(environment === 'dev')
{
    require('dotenv').config({path: '../'});
}
const ttn = require('ttn');
const database = require('./database');

const appID = process.env.TTNAPPID
const accessKey = process.env.TTNACCESSKEY
 
// discover handler and open mqtt connection
ttn.data(appID, accessKey)
  .then(function (client) {
    return client.on("uplink", function (devID, payload) {
      console.log("Received uplink from ", devID)
      console.log(payload)
      database.writeData(payload).catch(function (err) {
        console.error(err)
        process.exit(1)
      });
    })
  })
  .catch(function (err) {
    console.error(err)
    process.exit(1)
  })
 
// discover handler and open application manager client
ttn.application(appID, accessKey)
  .then(function (client) {
    return client.get()
  })
  .then(function (app) {
    console.log("Got app", app)
    console.log('Setting up collection in DB')
    database.setupCollection().catch(function (err) {
      console.error(err)
      process.exit(1)
    });
  })
  .catch(function (err) {
    console.error(err)
    process.exit(1)
  })