<template>
  <div style="width:200px">
    Select your application and device: 
   <div class=control_wrapper>
     <ejs-dropdownlist id='dropdownApplist' popupHeight="200px" popupWidth="100%" :dataSource='apps' :fields = 'appFields' :change='onChange' placeholder='Select your sensor application'></ejs-dropdownlist>

 <ejs-dropdownlist id='dropdownDevicelist' popupHeight="200px" popupWidth="100%" :dataSource='devices' :fields = 'devFields' :change='onDeviceChange' placeholder='Select your device'></ejs-dropdownlist>
<!--
  <div>app:{{apps}}<br>devices:{{devices}}</div>
   -->
   </div>
  
  </div>
</template>


<script>
import { mapState, mapActions } from "vuex";

export default {
  data: function(){
    return {
      appFields: {text: "app", value: "app"},
      devFields: {text: "dev", value: "dev"}
    }
  },
  computed: {
    
    ...mapState({
      devices: state => state.devices.devices.items,
      apps: state => state.devices.apps.items
    }),
    

  },
  created() {
    this.getUniqueApplications();
  },
  methods: {
    onChange: function(args){
        console.log(args);
        console.log('onChange() Value: '+args.value);
        this.getDevicesByApp(args.value);
       //this.$refs.dropdownDevicelist.ej2Instances.dataSource='devices'


    },
    onDeviceChange: function(args){
        console.log(args);
        console.log('onDeviceChange() Value: '+args.value);
    },
    ...mapActions("devices", {
      getUniqueApplications: "getUniqueApplications",
      getDevicesByApp: "getDevicesByApp"

    })
  }
};
</script>

<style>
@import "../../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-inputs/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
</style>
