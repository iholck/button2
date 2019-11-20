import { deviceService } from '../_services';

const state = {
    all: {}
};

const actions = {
    getUniqueApplications({ commit }) {
        commit('getUniqueApplications');

        deviceService.getUniqueApplications()
            .then(
                devices => commit('getUniqueApplicationsSuccess', devices),
                error => commit('getUniqueApplicationsFailure', error)
            );
    } 
};

const mutations = {
    getUniqueApplications(state) {
        state.all = { loading: true };
    },
    getUniqueApplicationsSuccess(state, devices) {
        state.all = { items: devices };
    },
    getUniqueApplicationsAllFailure(state, error) {
        state.all = { error };
    },


};

export const devices = {
    namespaced: true,
    state,
    actions,
    mutations
};
