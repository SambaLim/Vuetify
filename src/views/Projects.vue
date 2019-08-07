<template>
  <div class="projects">
    <h1 class="subheading grey--text">Projects</h1>

    <v-container class="my-5"  fluid grid-list-md>
        <!-- <div>{{ temperature.vs }} ℃</div>
        <div>{{ temperature.time }}</div>
        <div>{{ humidity.vs }} %</div>
        <div>{{ humidity.time }}</div>
        <div>{{ pm25.vs }}</div>
        <div>{{ pm25.time }}</div>
        <div>{{ pm10.vs }}</div>
        <div>{{ pm10.time }}</div> -->
        
      <v-layout wrap>
        <v-flex d-flex xs12 sm6 md4>
          <v-card :style='temperature.style' dark>
            <v-card-title primary class="title">온도</v-card-title>
            <v-icon style="font-size:10em">{{ temperature.icon }}</v-icon>
            <v-card-text style="font-size:2em">{{ temperature.vs }} ℃</v-card-text>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md4>
          <v-card :style='humidity.style' dark>
            <v-card-title primary class="title">습도</v-card-title>
            <v-icon style="font-size:10em">{{ humidity.icon }}</v-icon>
            <v-card-text style="font-size:2em">{{ humidity.vs }} %</v-card-text>
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 sm6 md4>
          <v-layout column>
            <v-flex>
              <v-card v-bind:style="pm25.style" dark>
                <v-card-title primary class="title">미세먼지(PM10)</v-card-title>
                <v-icon style="font-size:4em">{{ pm25.icon }}</v-icon>
                <v-card-text style="font-size:1.5em">{{ pm10.vs }}</v-card-text>
              </v-card>
            </v-flex>
            <v-flex>
              <v-card v-bind:style='pm10.style' dark>
                <v-card-title primary class="title">미세먼지(PM2.5)</v-card-title>
                <v-icon style="font-size:4em">{{ pm10.icon }}</v-icon>
                <v-card-text style="font-size:1.5em">{{ pm25.vs }}</v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
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
        icon:'sentiment_very_satisfied',
        style: {
          background: '#F44336',
          textAlign: 'center',
        }
      },
      humidity:  {
        vs: '',
        time: '',
        icon:'sentiment_satisfied',
        style: {
          background: '#2196F3',
          textAlign: 'center',
        }
      },
      pm25:  {
        vs: '',
        time: '',
        icon:'sentiment_dissatisfied',
        style: {
          background: '#9000A0',
          textAlign: 'center',
        }
      },
      pm10:  {
        vs: '',
        time: '',
        icon:'sentiment_very_dissatisfied',
        style: {
          background: '#4CAF50',
          textAlign: 'center',
        }
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
      // Subscribe with Topic
      client.subscribe("sensor");
      client.subscribe("battery-check");
      //client.subscribe("movesensor");
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
          console.log('Hello');
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
  },
  watch : {
  }
  
}
</script>
