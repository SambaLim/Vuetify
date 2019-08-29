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
                <v-card-text style="font-size:1.5em">{{ pm10.vs }} μm</v-card-text>
              </v-card>
            </v-flex>
            <v-flex>
              <v-card v-bind:style='pm10.style' dark>
                <v-card-title primary class="title">초미세먼지(PM2.5)</v-card-title>
                <v-icon style="font-size:4em">{{ pm10.icon }}</v-icon>
                <v-card-text style="font-size:1.5em">{{ pm25.vs }} μm</v-card-text>
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

const iconVerySatisfied = `sentiment_very_satisfied`;
const iconSatisfied = `sentiment_satisfied`;
const iconDisSatisfied = `sentiment_dissatisfied`;
const iconVeryDisSatisfied = `sentiment_very_dissatisfied`;
const colorVerySatisfied = `#4CAF50`;
const colorSatisfied = `#CDDC39`;
const colorDisSatisfied = `#FBC02D`;
const colorVeryDisSatisfied = `#F44336`;

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
          background: '#CDDC39',
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
          break;
        case 'sensor':
          dataArray = this.mqttMsg2DataArray(message);
          this.switchSensorDataObj(dataArray);
          break;
        case 'battery-check':
          dataArray = this.mqttMsg2DataArray(message);
          this.switchSensorDataObj(dataArray);
          break;
        default:
          dataArray = this.mqttMsg2DataArray(message);
          this.switchSensorDataObj(dataArray);
          break;
      }
    },
    mqttMsg2DataArray: function(message) {
      let getMessage= message.payloadString;
      let jsonMessage= JSON.parse(getMessage);
      return jsonMessage.COLCT_DATA[0];
    },
    switchSensorDataObj: function(dataArray) {
      let seqName = dataArray[0].bn;

      switch(seqName) {
        // pm25m, pm10
        case 'DEVICE_SEQ1':
          this.switchPM25Data(dataArray[1]);
          this.switchPM10Data(dataArray[2]);
          break;
        // temperature, humidity
        case 'DEVICE_SEQ2':
          this.switchTempData(dataArray[1]);
          this.switchHumData(dataArray[2]);
          break;
        default: 
          alert("New DEVICE Arrived!!!");
          break;
      }
    },
    switchPM25Data: function(obj) {
      let value = obj.vs;
      let con = this.pm25;

      con.vs = obj.vs;
      con.time = obj.t;
      this.mappingSensorData(value, con, 75, 35, 15);
    },
    switchPM10Data: function(obj) {
      let value = obj.vs;
      let con = this.pm10;
      
      con.vs = obj.vs;
      con.time = obj.t;
      this.mappingSensorData(value, con, 151, 150, 80);
    },
    switchTempData: function(obj) {
      let value = obj.vs;
      let con = this.temperature;
      
      con.vs = obj.vs;
      con.time = obj.t;
      this.mappingSensorData(value, con, 30, 27, 25);
    },
    switchHumData: function(obj) {
      let value = obj.vs;
      let con = this.humidity;
      
      con.vs = obj.vs;
      con.time = obj.t;
      this.mappingSensorData(value, con, 75, 50, 25);
    },
    mappingSensorData: function(value, con, val1, val2, val3) {
      if(value > val1) {
        con.icon = iconVeryDisSatisfied;
        con.style.background = colorVeryDisSatisfied;
        return;
      } 
      if(value > val2) {
        con.icon = iconDisSatisfied;
        con.style.background = colorDisSatisfied;
        return;
      } 
      if(value > val3) {
        con.icon = iconSatisfied;
        con.style.background = colorSatisfied;
        return;
      }
      con.icon = iconVerySatisfied;
      con.style.background = colorVerySatisfied;
    }
  }
}
</script>
