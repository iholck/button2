import { deviceService } from '../_services';

const state = {
    all: {},
    apps: {},
    devices: {},
    date: {},
    data: {},
    dataStats: {}
};

const actions = {
    getUniqueApplications({ commit }) {
        commit('getUniqueApplications');

        deviceService.getUniqueApplications()
            .then(
                apps => commit('getUniqueApplicationsSuccess', apps),
                error => commit('getUniqueApplicationsFailure', error)
            );
    },
    getDevicesByApp({ commit }, appValue) {
        commit('getDevicesByApp');
       // console.log(`getDevicesByApp: commit: ${commit}`);
      //  console.log(`getDevicesByApp: appValue: ${appValue}`);
        deviceService.getDevicesByApp(appValue)
            .then(
                devices => commit('getDevicesByAppSuccess', devices),
                error => commit('getDevicesByAppFailure', error)
            );
    },
    getDeviceDataByTimeRange({ commit }, input) {
        commit('getDeviceDataByTimeRange');
       // console.log(`getDevicesByApp: commit: ${commit}`);
      //  console.log(`getDevicesByApp: appValue: ${appValue}`);
        deviceService.getDeviceDataByTimeRange(input.device, input.start, input.end)
            .then(
                devices => commit('getDeviceDataByTimeRangeSuccess', devices),
                error => commit('getDeviceDataByTimeRangeFailure', error)
            );
    },
    attemptDeviceDataLoad({ commit}){
        console.log(`AttemptDataLoad: ${state.devices.selected}, ${state.date.start}, ${state.date.end}`);
        if(state.devices.selected && state.date.start && state.date.end){
            const startDate = new Date(state.date.start);
            startDate.setHours(0,0,0);
            const endDate = new Date(state.date.end);
            endDate.setHours(23,59,59)
            console.log(`Data present, proceeding to load data: ${state.devices.selected}, ${startDate}, ${endDate}`);
            commit('getDeviceDataByTimeRange');
            // console.log(`getDevicesByApp: commit: ${commit}`);
           //  console.log(`getDevicesByApp: appValue: ${appValue}`);
             deviceService.getDeviceDataByTimeRange(state.devices.selected, startDate, endDate)
                 .then(
                     devices => commit('getDeviceDataByTimeRangeSuccess', devices),
                     error => commit('getDeviceDataByTimeRangeFailure', error)
                 );
        }else{
            console.log(`Data not present, no data loading`);
        }
    },

    setSelectedDevice({ commit }, device){
        commit('setSelectedDevice', device);
        commit('clearDatepickerDate');
    },

    setDatepickerDate({ commit }, times){
       console.log(`device.module.setDatepickerDate(): Start: ${times.start}, end:${times.end} `);
        commit('setDatepickerDate', times);
      
    }
   
    
    
};

const mutations = {
    getUniqueApplications(state) {
        state.apps = { loading: true };
    },
    getUniqueApplicationsSuccess(state, apps) {
        state.apps = { items: apps };
    },
    getUniqueApplicationsAllFailure(state, error) {
        state.apps = { error };
    },
    getDevicesByApp(state) {
        state.devices = { loading: true };
    },
    getDevicesByAppSuccess(state, devices) {
     //   console.log(`getDevicesByAppSuccess() Devices: ${JSON.stringify(devices)}`);
        state.devices = { items: devices };
    },
    getDevicesByAppFailure(state, error) {
        state.devices = { error };
    },
    getDeviceDataByTimeRange(state) {
        state.data = { items: {}, loading: true };
    },
    getDeviceDataByTimeRangeSuccess(state, data) {
        let processedData = [];
        let tempData = [];
        let humidityData = [];

        data.forEach(dataItem => {
            dataItem = Object.assign({},dataItem.payload_fields, dataItem.metadata,dataItem);
            delete dataItem.metadata;
            delete dataItem.payload_fields;
           // dataItem.time = new Date(dataItem.time).getTime();

            processedData.push(dataItem);
            tempData.push(dataItem.temp);
            humidityData.push(dataItem.humidity);
        //    console.log(Math.max(tempData));
       //     console.log(humidityData);
        });
        state.dataStats = {
           
            maxTemp: Math.max(...tempData),
            minTemp: Math.min(...tempData),
            maxHumidity: Math.max(...humidityData),
            minHumidity: Math.min(...humidityData)
            };
        
        state.data = { items: processedData };
    },
    getDeviceDataByTimeRangeFailure(state, error) {
        state.data = { error };
    },

    setDatepickerDate(state, dates){
      //  console.log(`setDatepickerDate: ${JSON.stringify(dates)}`);
        state.date = dates;
    },
    clearDatepickerDate(state){
        //  console.log(`setDatepickerDate: ${JSON.stringify(dates)}`);
          state.date = {};
      },
    setSelectedDevice(state, device){
        console.log(`setSelectedDevice: ${device}`);
        state.devices = Object.assign({},state.devices, {selected:device});
       
    }
   

};

export const devices = {
    namespaced: true,
    state,
    actions,
    mutations
};
