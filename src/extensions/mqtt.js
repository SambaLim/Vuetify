import Paho from 'paho-mqtt/paho-mqtt.js'

const clientIP = "121.160.17.75";
const portNum = Number(9001);
const userNm = "user1";

const client = new Paho.Client(clientIP, portNum, userNm);

export default client;