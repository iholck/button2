const dataDB = require('_helpers/db');
const sensorData = dataDB.Data;

module.exports = {
    getUniqueAppIDs,
    getUniqueDevicesByAppID,
    getDataByDevice,
    getAll,
    getById,
    getMetadataByDevice,
    getDeviceDataByTimeRange,
    delete: _delete
};


async function getUniqueAppIDs(){
    console.log('getUniqueAppIDs called');
    return await sensorData.distinct('app_id');
}

async function getUniqueDevicesByAppID(app_id){
    return await sensorData.find({ app_id: app_id}).distinct('dev_id');
}




async function getAll() {
    return await sensorData.find();
}

async function getById(id) {
    return await sensorData.findById(id);
}

async function getDataByDevice(dev_id){
    console.log('data.service.getDataByDevice: '+dev_id);
 //   return await sensorData.find({dev_id: dev_id}).select({"metadata.gateways":0,payload_raw:0});
 return await sensorData.find({dev_id: dev_id}).select({app_id:1,dev_id:1,counter:1,"payload_fields":1});
}

async function getMetadataByDevice(dev_id){
    console.log('data.service.getDataByDevice: '+dev_id);
 //   return await sensorData.find({dev_id: dev_id}).select({"metadata.gateways":0,payload_raw:0});
 return await sensorData.find({dev_id: dev_id}).select({app_id:1,dev_id:1,counter:1,"metadata":1});
}

async function getDeviceDataByTimeRange(dev_id,startTime,endTime){
    return await sensorData.find({dev_id: dev_id,"metadata.time":{ $gte: new Date(new Date(startTime).setHours(00,00,00)), $lte: new Date(new Date(endTime).setHours(00,00,00))}});
}

async function getDeviceMetaDataByTimeRange(dev_id,startTime,endTime){
    return await sensorData.findDeviceMetaDataByTimeTange(dev_id,startTime,endTime);
}



async function _delete(id) {
    await sensorData.findByIdAndRemove(id);
}