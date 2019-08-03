<template>
  <div class="chatroom">
    <h1 class="subheading grey--text">Chatting Room</h1>
    <v-container class="my-5">
      <v-layout row>
        <v-flex>
          <v-card>
            <v-list>
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
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row mt-5>
        <v-flex xs8 md8 sm8>
          <v-text-field v-model="msg" placeholder="Please enter your message"></v-text-field>  
        </v-flex>
        <v-flex xs2 md10 sm2>
          <v-btn class="success">Submit</v-btn>  
        </v-flex>
      </v-layout>
      <!--
      <div style="position:absolute; bottom:0; width:80%;">
        <v-text-field v-model="msg" placeholder="Please enter your message"></v-text-field>
        <v-btn class="success">Submit</v-btn>
      </div>
      -->
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userName: this.$route.params.username,
      date : '',
      msg: '',
      chats : [
        {name: 'Samba', content: 'Hello', date: '2019-07-24 123123123', state: '0'},
        {name: 'Samba', content: 'Hi', date: '2019-07-24 453535', state: '0'},
        {name: 'Samba', content: 'Vuetify', date: '2019-07-24 25467467', state: '0'}
      ]
    }
  },
  created: function() {
    this.getDate();
  },
  methods: {
    getDate: function() {
      let now = new Date();

      this.date = `${now.getFullYear()}년 ${now.getMonth() + 1}월 ${now.getDate()}일 ${now.getHours()}시 ${now.getMinutes()}분 ${now.getSeconds()}초 ${now.getMilliseconds()}`
    }
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
