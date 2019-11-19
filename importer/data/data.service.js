const dataDB = require('../helpers/db');
const sensorData = dataDB.Data;

module.exports = {
    createEntry,
    delete: _delete
};


async function createEntry(dataParams){

    //validation, if any

    const data = new sensorData(dataParams);
    await data.save();
}

async function _delete(id) {
    await sensorData.findByIdAndRemove(id);
}