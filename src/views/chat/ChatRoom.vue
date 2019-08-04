<template>
  <v-container fluid fill-height>
    <v-layout justify-space-between column>
      <v-flex xs11>
        <v-layout row>
          <v-flex>
            <v-card>
              <v-list v-if="chats.length != 0">
                <v-list-tile v-for="chat in chats" :key="chat.date" class="my-3">
                  <v-list-tile-action>
                    <v-layout row align-space-between>
                      <v-flex>
                        <v-icon>person</v-icon>
                      </v-flex>
                      <v-flex>
                        <span class="caption">{{ chat.name }}</span>
                      </v-flex>
                    </v-layout>
                  </v-list-tile-action>
                  <v-list-tile-content class="pl-4">
                    <v-list-tile-sub-title>
                      <span>{{ date | getYearMonthDay }}</span>
                    </v-list-tile-sub-title>
                    <v-list-tile-title class="heading">
                      <span>{{ chat.content }}</span>
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>
              <v-list class="headline" style="text-align:center;" v-else>
                Nice to meet you, {{userName}} 
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-spacer></v-spacer>
      <v-flex xs1>
        <v-layout row>
          <v-flex lg11 xl11 md9 sm9 xs9>
            <v-text-field id="chatBox" v-model="msg" placeholder="Please enter your message" @keyup.enter="enterMsg"></v-text-field>  
          </v-flex>
          <v-flex lg1 xl1 md2 sm2 xs2>
            <v-btn class="success" @click="enterMsg">Submit</v-btn>  
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import db from '@/extensions/fb'

export default {
  data() {
    return {
      userName: this.$route.params.username,
      date : '',
      msg: '',
      chats : [
      ]
    }
  },
  created: function() {
    this.getDate();
  },
  mounted: function() {
    document.getElementById('chatBox').focus();
  },
  methods: {
    getDate: function() {
      let now = new Date();

      this.date = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일 ${now.getHours()}시 ${now.getMinutes()}분 ${now.getSeconds()}초 ${now.getMilliseconds()}`
    },
    enterMsg: function() {
      let msgLen = this.msg.length;
      if(msgLen == 0) return;

      let chat = {
        state: '0',
        name: this.userName,
        date: this.getDate(),
        content: this.msg,
      }
      this.chats.push(chat);
      this.msg = '';
    },
  },
  filters: {
    getYearMonthDay: function(value) {
      let stringArray = [];
      stringArray = value.split(" ");

      return `${stringArray[0]} ${stringArray[1]} ${stringArray[2]} ${stringArray[3]} ${stringArray[4]} ${stringArray[5]}`;
    }
  }
}
</script>
