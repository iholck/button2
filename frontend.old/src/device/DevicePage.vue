<template>
  <div>
    <div>
      <div>
        Select customer and device:
        <table>
          <tr>
            <th style="width: 25%">
              <ejs-dropdownlist
                id="dropdownApplist"
                popupHeight="200px"
                popupWidth="100%"
                :dataSource="apps"
                :fields="appFields"
                :change="onAppChange"
                placeholder="Select your sensor application"
              ></ejs-dropdownlist>
            </th>
            <th style="width: 25%">
              <ejs-dropdownlist
                id="dropdownDevicelist"
                popupHeight="200px"
                popupWidth="100%"
                :dataSource="devices"
                :fields="devFields"
                :change="onDeviceChange"
                placeholder="Select your device"
              ></ejs-dropdownlist>
            </th>

            <th style="width: 25%">
              <ejs-daterangepicker
                :min="minDate"
                :max="maxDate"
                :startDate="startDate"
                :endDate="endDate"
                :change="onDatepickerChange"
                :strictMode="true"
                :placeholder="waterMark"
              ></ejs-daterangepicker>
            </th>
            <th style="width: 10%"></th>
            <th style="width: 15%">
              <table>
                <tr>
                  <ejs-checkbox
                    label="Display Temperature"
                    v-model="tempChecked"
                    :checked="tempChecked"
                  ></ejs-checkbox>
                </tr>
                <tr>
                  <ejs-checkbox
                    label="Display Humidity"
                    v-model="humidChecked"
                    :checked="humidChecked"
                  ></ejs-checkbox>
                </tr>
              </table>
            </th>
          </tr>
        </table>
      </div>
    </div>
    <!--
  {{sensorData||''}}
    -->

    <div>
      <ejs-chart
        id="container"
        width="100%"
        height="350px"
        :dataSource="sensorData"
        :primaryXAxis="primaryXAxis"
        :primaryYAxis="primaryYAxis"
        :axes="axes"
        :rows="rows"
        :title="selectedDevice"
        :legendSettings="legendSettings"
        :zoomSettings="zoomSettings"
        :tooltip="tooltip"
      >
        <e-series-collection>
          <e-series v-if="tempChecked" type="Line" xName="time" yName="temp" name="Temperature"></e-series>
          <e-series
            v-if="humidChecked"
            type="Line"
            xName="time"
            yName="humidity"
            yAxisName="yAxisHumidity"
            name="Humidity"
          ></e-series>
          <!--
                  <e-series :dataSource='testData' type='Line' xName="data.x" yName="data.y" > </e-series>

          -->
        </e-series-collection>
      </ejs-chart>
      MaxTemp: {{maxTemp}}, MinTemp: {{minTemp}}, maxHumidity: {{maxHumidity}}, minHumidity: {{minHumidity}}
    </div>
  </div>
</template>


<script>
import { mapState, mapActions } from 'vuex';
import {
  LineSeries,
  DateTime,
  Category,
  Legend,
  Zoom,
  Tooltip,
} from '@syncfusion/ej2-vue-charts';
import { CheckBoxPlugin } from '@syncfusion/ej2-vue-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

export default {
  data() {
    return {
      tempChecked: true,
      humidChecked: true,
      appFields: { text: 'app', value: 'app' },
      devFields: { text: 'dev', value: 'dev' },
      endDate: new Date(),
      startDate: new Date().setDate(new Date().getDate() - 7),
      maxDate: new Date(),
      minDate: new Date('2019-11-01'),
      waterMark: 'Select a date range',
      primaryXAxis: {
        valueType: 'DateTime',
        labelFormat: 'd.M.y HH:mm',
        intervalType: 'Hours',
        interval: 6,
        rangePAdding: 'Round',
        edgeLabelPlacement: 'None',
        majorGridLines: { width: 0 },
      },

      primaryYAxis: {
        lineStyle: { width: 0 },
        //    minimum: 15 ,
        //    maximum: 25 ,
        interval: 1,
        title: 'Temperature (Celsius)',
        labelFormat: '{value}°C',
        span: 2,
        rangePadding: 'round',
      },

      axes: [
        {
          majorGridLines: { width: 0 },
          //  rowIndex: 1,
          opposedPosition: true,
          lineStyle: { width: 1 },
          //  minimum: 30,
          //  maximum: 100,
          interval: 2,
          name: 'yAxisHumidity',
          title: 'Humidity',
          labelFormat: '{value}%',
          rangePadding: 'round',
        },
      ],
      rows: [
        {
          height: '100%',
        },
        {
          height: '50%',
        },
      ],
      legendSettings: {
        visible: true,
      },
      zoomSettings: {
        enableSelectionZooming: true,
        // zoom mode as x
        enableSelectionZooming: true,
        mode: 'X',
      },
      marker: {
        visible: true,
        width: 10,
        height: 10,
        border: { width: 2, color: '#F8AB1D' },
      },
      tooltip: { enable: true, shared: true },
    };
  },

  provide: {
    chart: [LineSeries, DateTime, Category, Legend, Zoom, Tooltip],
  },

  computed: {
    ...mapState({
      devices: (state) => state.devices.devices.items,
      selectedDevice: (state) => state.devices.devices.selected,
      apps: (state) => state.devices.apps.items,
      sensorData: (state) => state.devices.data.items,
      dateStart: (state) => state.devices.date.start,
      dateEnd: (state) => state.devices.date.end,
      maxTemp: (state) => state.devices.dataStats.maxTemp,
      minTemp: (state) => state.devices.dataStats.minTemp,
      maxHumidity: (state) => state.devices.dataStats.maxHumidity,
      minHumidity: (state) => state.devices.dataStats.minHumidity,
    }),
  },
  created() {
    this.getUniqueApplications();
  },
  methods: {
    onAppChange(args) {
      /*
      console.log(args);
      console.log("onChange() Value: " + args.value);
      */
      this.getDevicesByApp(args.value);
    },
    onDeviceChange(args) {
      /*
      console.log(args);
      console.log("onDeviceChange() Value: " + args.value);
      */
      this.setSelectedDevice(args.value);
      this.attemptDeviceDataLoad();
    },
    onDatepickerChange(args) {
      /*
      console.log(
        `onDatepickerChange: Start: ${args.startDate}, end: ${args.endDate}`
      );
      */
      this.setDatepickerDate({ start: args.startDate, end: args.endDate });
      this.attemptDeviceDataLoad();
    },

    ...mapActions('devices', {
      getUniqueApplications: 'getUniqueApplications',
      getDevicesByApp: 'getDevicesByApp',
      getDeviceDataByTimeRange: 'getDeviceDataByTimeRange',
      setDatepickerDate: 'setDatepickerDate',
      setSelectedDevice: 'setSelectedDevice',
      attemptDeviceDataLoad: 'attemptDeviceDataLoad',
    }),
  },
};
</script>

<style>
@import "../../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-inputs/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-lists/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-calendars/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
</style>
