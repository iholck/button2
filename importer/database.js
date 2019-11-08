// @ts-check
const environment = process.env.NODE_ENV || 'dev';
if (environment === 'dev') {
    require('dotenv').config({ path: '../' });
}
const tools = require('./helpers/tools');
const MongoClient = require('mongodb').MongoClient;
const dbURL = `mongodb://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}:27017/${process.env.DBNAME}`;


const database = {

    getDBConnection: async function () {
        try {

            return await MongoClient.connect(dbURL, { useUnifiedTopology: true })


        } catch (err) {
            tools.error(err);
        };
    },

    getDB: async function (dbConnection) {
        try {
            //const dbConnection = await getDBConnection();
            return dbConnection.db(process.env.DBNAME);
        } catch (err) {
            tools.error(err);
        };
    },

    getCollection: async function (dbConnection) {
        try {
            //const dbConnection = await getDBConnection();
            return dbConnection.collection(process.env.DBNAME);
        } catch (err) {
            tools.error(err);
        };
    },

    setupCollection: async function () {
        try {
            const db = await this.getDBConnection();
            const dbo = await this.getDB(db);
            dbo.createCollection(process.env.DBNAME);
            db.close();
            tools.log('Collection created!');
        } catch (err) {
            tools.error(err);
            throw err;
        };
    },

    writeData: async function (incomingData) {
        try {
            const db = await this.getDBConnection()
            const dbo = await this.getDB(db);
            const collection = await this.getCollection(dbo);
            collection.insertOne(incomingData);
            db.close();
        } catch (err) {
            tools.error(err);
            throw err;
        };
    }

}

module.exports = database;