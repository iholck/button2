import { deviceService } from '../_services';

const state = {
    all: {},
    apps: {},
    devices: {},
    date: {},
    data: {}
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
            console.log('Data present, proceeding to load data');
            commit('getDeviceDataByTimeRange');
            // console.log(`getDevicesByApp: commit: ${commit}`);
           //  console.log(`getDevicesByApp: appValue: ${appValue}`);
             deviceService.getDeviceDataByTimeRange(state.devices.selected, state.date.start, state.date.end)
                 .then(
                     devices => commit('getDeviceDataByTimeRangeSuccess', devices),
                     error => commit('getDeviceDataByTimeRangeFailure', error)
                 );
        }else{
            console.log('Data not present, no data loading');
        }
    },

    setSelectedDevice({ commit }, device){
        commit('setSelectedDevice', device);
    },

    setDatepickerDate({ commit }, times){
      //  console.log(`device.module.setDatepickerDate(): Start: ${times.start}, end:${times.end} `);
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
        state.data = { loading: true };
    },
    getDeviceDataByTimeRangeSuccess(state, data) {
         console.log(`getDeviceDataByTimeRangeSuccess() Devices: ${JSON.stringify(data)}`);
        state.data = { items: data };
    },
    getDeviceDataByTimeRangeFailure(state, error) {
        state.data = { error };
    },

    setDatepickerDate(state, dates){
      //  console.log(`setDatepickerDate: ${JSON.stringify(dates)}`);
        state.date = dates;
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
