import Vue from 'vue';
import Vuex from 'vuex';

import { DropDownListPlugin } from '@syncfusion/ej2-vue-dropdowns';

import { alert } from './alert.module';
import { account } from './account.module';
import { users } from './users.module';
import { devices } from './device.module';


Vue.use(Vuex);
Vue.use(DropDownListPlugin);

export const store = new Vuex.Store({
    modules: {
        alert,
        account,
        users,
        devices
    }
});
