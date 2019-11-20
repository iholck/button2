<template>
  <div style="width:200px">
    Select your application and device: 
   <div class=control_wrapper>
     <ejs-dropdownlist id='dropdownApplist' popupHeight="200px" popupWidth="150px" :dataSource='apps' :fields = 'appFields' placeholder='Select your sensor application'></ejs-dropdownlist>

 <ejs-dropdownlist id='dropdownDevicelist' popupHeight="200px" popupWidth="150px" :dataSource='devices' :fields = 'appFields' placeholder='Select your device'></ejs-dropdownlist>

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
      devices: state => state.devices.all,
      apps: state => state.devices.all.items
    }),
    

  },
  created() {
    this.getUniqueApplications();
  },
  methods: {
    ...mapActions("devices", {
      getUniqueApplications: "getUniqueApplications",

    })
  }
};
</script>

<style>
@import "../../node_modules/@syncfusion/ej2-vue-dropdowns/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-inputs/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
</style>
