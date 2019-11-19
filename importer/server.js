// @ts-check

const environment = process.env.NODE_ENV || 'dev';
if (environment === 'dev') {
  require('dotenv').config({ path: '../.env' });
}

const tools = require('./helpers/tools');
const ttn = require('ttn');
const database = require('./data/data.service');

const appID = process.env.TTNAPPID
const accessKey = process.env.TTNACCESSKEY

// discover handler and open mqtt connection
console.log(`AppId: ${appID}, accessKey: ${accessKey}`);
ttn.data(appID, accessKey)
  .then(function (client) {
    return client.on("uplink", function (devID, payload) {
      tools.log("Received uplink from "+ devID)
      console.log(payload)
      database.createEntry(payload).catch(function (err) {
        tools.error(err)
        process.exit(1)
      });
    })
  })
  .catch(function (err) {
    tools.error('TTN.Data caught: '+err)
    process.exit(1)
  })

// discover handler and open application manager client
ttn.application(appID, accessKey)
  .then(function (client) {
    return client.get()
  })
  .then(function (app) {
    tools.log("Got app: "+app.appId)
    /*
    tools.log('Setting up collection in DB...')
    setTimeout(function () {
      database.setupCollection().catch(function (err) {
        tools.error(err)
        process.exit(1)
      });
    }, 10000);
    */
  })
  .catch(function (err) {
    tools.error('Catchall: '+err)
    process.exit(1)
  })