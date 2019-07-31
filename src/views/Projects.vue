<template>
  <div class="projects">
    <h1 class="subheading grey--text">Projects</h1>

    <v-container class="my-5">
      <div>{{ temperature.vs }} ℃</div>
      <div>{{ temperature.time }}</div>
      <div>{{ humidity.vs }} %</div>
      <div>{{ humidity.time }}</div>
      <div>{{ pm25.vs }}</div>
      <div>{{ pm25.time }}</div>
      <div>{{ pm10.vs }}</div>
      <div>{{ pm10.time }}</div>
    </v-container>
  </div>
</template>

<script>
import client from '@/extensions/mqtt.js'

export default {
  data() {
    return {
      temperature: {
        vs: '',
        time: '',
      },
      humidity:  {
        vs: '',
        time: '',
      },
      pm25:  {
        vs: '',
        time: '',
      },
      pm10:  {
        vs: '',
        time: '',
      },
    }
  },
  created: function() {
    var that = this;
    // set callback handlers
    client.onConnectionLost = this.onConnectionLost;
    client.onMessageArrived = this.onMessageArrived;
    this.mqttConnect();
  },
  methods:{
    mqttConnect: function() {
      client.connect({
        onSuccess: this.mqttOnConnect,
        useSSL: true,
      });
    },
    mqttOnConnect: function() {
      console.log("Connected!");
      client.subscribe("sensor");
      client.subscribe("battery-check");
      client.subscribe("movesensor");
    },
    onConnectionLost: function() {
      console.log("Connection Lost!");
      this.mqttConnect();
    },
    onMessageArrived: function(message) {
      let msgNm = message.destinationName;
      let dataArray = null;

      switch(msgNm) {
        case 'movesensor':
          console.log(`detected!`);
          break;
        case 'sensor':
          dataArray = this.mqttMsg2DataArray(message);
          if(dataArray[1].n == 'pm25') {
            this.pm25.vs = dataArray[1].vs;
            this.pm25.time = dataArray[1].t;
            this.pm10.vs = dataArray[2].vs;
            this.pm10.time = dataArray[2].t;
          } else {
            this.temperature.vs = dataArray[1].vs;
            this.temperature.time = dataArray[1].t;
            this.humidity.vs = dataArray[2].vs;
            this.humidity.time = dataArray[2].t;
          }
          console.log(this.temperature.vs);
          console.log(dataArray)
          break;
        case 'battery-check':
          dataArray = this.mqttMsg2DataArray(message);
          console.log(dataArray)
          break;
        default:
          dataArray = this.mqttMsg2DataArray(message);
          break;
      }
    },
    mqttMsg2DataArray: function(message) {
      let getMessage= message.payloadString;
      let jsonMessage= JSON.parse(getMessage);
      return jsonMessage.COLCT_DATA[0];
    }
  }
}
</script>
