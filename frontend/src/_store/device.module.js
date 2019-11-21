import { deviceService } from '../_services';

const state = {
    all: {},
    apps: {},
    devices: {},
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

};

export const devices = {
    namespaced: true,
    state,
    actions,
    mutations
};
