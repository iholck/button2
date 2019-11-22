<template>
<div>
  <div style="width:200px">
    Select your application and device: 
   <div class=control_wrapper>
     <ejs-dropdownlist id='dropdownApplist' popupHeight="200px" popupWidth="100%" :dataSource='apps' :fields = 'appFields' :change='onAppChange' placeholder='Select your sensor application'></ejs-dropdownlist>

 <ejs-dropdownlist id='dropdownDevicelist' popupHeight="200px" popupWidth="100%" :dataSource='devices' :fields = 'devFields' :change='onDeviceChange' placeholder='Select your device'></ejs-dropdownlist>
<!--
  <div>app:{{apps}}<br>devices:{{devices}}</div>
  -->
  
  
   </div>
   
   <div class='wrapper'>
        <ejs-daterangepicker  :min="minDate" :max="maxDate"  :change='onDatepickerChange' :strictMode=true :placeholder="waterMark"></ejs-daterangepicker>
      </div>
      

      
        <!--
  {{sensorData||''}}
  -->
     </div> 
<ejs-chart id="container" :dataSource='sensorData' :primaryXAxis='primaryXAxis' :title='selectedDevice'>
            <e-series-collection>
           
                  <e-series  type='Line'  xName="time" yName="temp" > </e-series>
                  <e-series  type='Line'  xName="time" yName="humidity" > </e-series>
                <!--
                  <e-series :dataSource='testData' type='Line' xName="data.x" yName="data.y" > </e-series>
              
                -->
            </e-series-collection>
        </ejs-chart>
      </div>
</template>


<script>
import { mapState, mapActions } from "vuex";
import { LineSeries,DateTime } from "@syncfusion/ej2-vue-charts";

export default {
  data: function(){
    return {
      appFields: {text: "app", value: "app"},
      devFields: {text: "dev", value: "dev"},
      startDate: new Date(),
      endDate: new Date(),
      maxDate: new Date(),
      minDate: new Date('2019-11-01'),
      waterMark: 'Select a range',
      primaryXAxis: {
        valueType: 'DateTime',
        labelFormat: 'd.M.y',
        intervalType: 'Days',
        edgeLabelPlacement: 'Shift',
        majorGridLines: { width: 0 }
        },
    }
  },
  
  provide: {
    chart: [LineSeries,DateTime]
  },
  
  computed: {
    
    ...mapState({
      devices: state => state.devices.devices.items,
      selectedDevice: state => state.devices.devices.selected,
      apps: state => state.devices.apps.items,
      sensorData: state => state.devices.data.items,
      dateStart: state => state.devices.date.start,
      dateEnd: state => state.devices.date.end

    }),
    

  },
  created() {
    this.getUniqueApplications();
  },
  methods: {
    onAppChange: function(args){
        console.log(args);
        console.log('onChange() Value: '+args.value);
        this.getDevicesByApp(args.value);
    


    },
    onDeviceChange: function(args){
        console.log(args);
        console.log('onDeviceChange() Value: '+args.value);
        this.setSelectedDevice(args.value);
        this.attemptDeviceDataLoad();
    },
    onDatepickerChange: function(args){
        console.log(`onDatepickerChange: Start: ${args.startDate}, end: ${args.endDate}`);
        this.setDatepickerDate({start: args.startDate, end: args.endDate});
        this.attemptDeviceDataLoad();

    },

    
    ...mapActions("devices", {
      getUniqueApplications: "getUniqueApplications",
      getDevicesByApp: "getDevicesByApp",
      getDeviceDataByTimeRange: "getDeviceDataByTimeRange",
      setDatepickerDate: "setDatepickerDate",
      setSelectedDevice: "setSelectedDevice",
      attemptDeviceDataLoad: "attemptDeviceDataLoad"

    })
  }
};
</script>

<style>
@import "../../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-inputs/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import '../../node_modules/@syncfusion/ej2-buttons/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-popups/styles/material.css';
@import '../../node_modules/@syncfusion/ej2-lists/styles/material.css';
@import "../../node_modules/@syncfusion/ej2-vue-calendars/styles/material.css";
</style>
