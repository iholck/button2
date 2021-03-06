import Vue from 'vue';
import Vuex from 'vuex';

import { DropDownListPlugin } from '@syncfusion/ej2-vue-dropdowns';
import { DateRangePickerPlugin } from '@syncfusion/ej2-vue-calendars';
import { ChartPlugin } from '@syncfusion/ej2-vue-charts';
import { CheckBoxPlugin } from '@syncfusion/ej2-vue-buttons';


import { alert } from './alert.module';
import { account } from './account.module';
import { users } from './users.module';
import { devices } from './device.module';


Vue.use(Vuex);
Vue.use(DropDownListPlugin);
Vue.use(DateRangePickerPlugin);
Vue.use(ChartPlugin);
Vue.use(CheckBoxPlugin);

const store = new Vuex.Store({
    modules: {
      alert,
      account,
      users,
      devices,
    },
  });
  

export default store;