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
    getDeviceMetaDataByTimeRange,
    delete: _delete
};


async function getUniqueAppIDs(){
    console.log('getUniqueAppIDs called');
    let applications = await sensorData.distinct('app_id');
    return JSONIfy(applications,'app');
   // return applications;
}



async function getUniqueDevicesByAppID(app_id){
    let sensors = await sensorData.find({ app_id: app_id}).distinct('dev_id');
    return JSONIfy(sensors,'dev');
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
 return await sensorData.find({dev_id: dev_id}).select({app_id:1,dev_id:1,counter:1,"payload_fields":1,"metadata.time":1});
}

async function getMetadataByDevice(dev_id){
    console.log('data.service.getDataByDevice: '+dev_id);
 //   return await sensorData.find({dev_id: dev_id}).select({"metadata.gateways":0,payload_raw:0});
 return await sensorData.find({dev_id: dev_id}).select({app_id:1,dev_id:1,counter:1,"metadata":1});
}

async function getDeviceDataByTimeRange(dev_id,startTime,endTime){
    var { startDate, endDate } = fixupStartEndDate(startTime, endTime);
    return await sensorData.find({dev_id: dev_id,"metadata.time":{ $gte: startDate, $lte: endDate}}).select({app_id:1,dev_id:1,counter:1,"payload_fields":1,"metadata.time":1});
}



async function getDeviceMetaDataByTimeRange(dev_id,startTime,endTime){
    var { startDate, endDate } = fixupStartEndDate(startTime, endTime);
    return await sensorData.find({dev_id: dev_id,"metadata.time":{ $gte: startDate, $lte: endDate}}).select({app_id:1,dev_id:1,counter:1,metadata:1});
}



async function _delete(id) {
    await sensorData.findByIdAndRemove(id);
}

function fixupStartEndDate(startTime, endTime) {
    var startDate = new Date(startTime);
    var endDate = new Date(endTime);
    if (startDate.toTimeString() == endDate.toTimeString()) {
        endDate.setTime(endDate.getTime() + 86399000);
    }
    return { startDate, endDate };
}

function JSONIfy(myArray,keyname) {
    let JSONArray = [];
    myArray.forEach(item => {
        JSONArray.push({ [keyname]: item });
    });
    return JSONArray;
}