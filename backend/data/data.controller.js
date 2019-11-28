const express = require('express');
const router = express.Router();
const dataService = require('./data.service');


router.get('/uniqueApps',getUniqueApps);
router.get('/deviceByApp/:app',getDevicesByApp);
router.get('/device/:device', getDataByDevice);
router.get('/device/:device/data/:fromDate/:toDate', getDeviceDataByTimeRange);
router.get('/device/:device/metadata/:fromDate/:toDate', getDeviceMetaDataByTimeRange);
router.get('/device/', getDataAll);

module.exports = router;

function getUniqueApps(req, res, next) {
    console.log('Data.controller.getUniqueApps()');
    dataService.getUniqueAppIDs()
        .then(data => data ? res.json(data) : res.status(400).json({ message: 'No data found' }))
        .catch(err => next(err));
}

function getDevicesByApp(req, res, next) {
    console.log('Data.controller.getDevicesByApp('+req.params.app+')');
    dataService.getUniqueDevicesByAppID(req.params.app)
        .then(data => data.length>0 ? res.json(data) : res.status(400).json({ message: 'No data found' }))
        .catch(err => next(err));
}

function getDataByDevice(req, res, next) {
    console.log('Data.controller.getDataByDevice(): '+req.params.device);
    dataService.getDataByDevice(req.params.device)
        .then(data => data ? res.json(data) : res.status(400).json({ message: 'No data found' }))
        .catch(err => next(err));
}

function getDeviceDataByTimeRange(req, res, next) {
    console.log(`Data.controller.getDeviceDataByTimeRange(): ${req.params.device}: ${req.params.fromDate} to ${req.params.toDate}`);
    dataService.getDeviceDataByTimeRange(req.params.device,req.params.fromDate,req.params.toDate)
        .then(data => data ? res.json(data) : res.status(400).json({ message: 'No data found' }))
        .catch(err => next(err));
}

function getDeviceMetaDataByTimeRange(req, res, next) {
    console.log(`Data.controller.getDeviceDataByTimeRange(): ${req.params.device}: ${req.params.fromDate} to ${req.params.toDate}`);
    dataService.getDeviceMetaDataByTimeRange(req.params.device,req.params.fromDate,req.params.toDate)
        .then(data => data ? res.json(data) : res.status(400).json({ message: 'No data found' }))
        .catch(err => next(err));
}

function getDataAll(req, res, next) {
    console.log('Data.controller.getDataAll()');
    dataService.getAll(req.params.device)
        .then(data => data ? res.json(data) : res.status(400).json({ message: 'No data found' }))
        .catch(err => next(err));
}

/*
function authenticate(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
*/