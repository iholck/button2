<template>
  <div>
    Please select your device: 
    <ul>
            <li v-for="device in devices.items" :key="device.item">
                {{device.item}}
            </li>
        </ul>
   
  </div>
</template>


<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      devices: state => state.devices.all
    })
  },
  created() {
    this.getUniqueApplications();
  },
  methods: {
    ...mapActions("devices", {
      getUniqueApplications: "getUniqueApplications"
    })
  }
};
</script>