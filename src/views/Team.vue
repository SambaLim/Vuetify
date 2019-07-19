<template>
  <div class="team">
    <h1 class="subheading grey--text">Team</h1>

    <v-container class="my-5">
      
      <v-layout row wrap>
        <v-flex xs12 sm6 md4 lg3 v-for="person in team" :key="person.name">
          <v-card class="text-xs-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="100" class="grey lighten-2">
                <img :src="person.avatar">
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ person.name }}</div>
              <div class="grey--text">{{ person.role }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn flat color="grey">
                <v-icon small left>mail</v-icon>
                <span class="text-lowercase">{{ person.mail }}</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>

    </v-container>

  </div>
</template>

<script>
export default {
  data() {
    return {
      team: [
        { name: '김장욱', role: 'Chief / Managing Director', mail:'jango@wavus.co.kr', avatar: 'https://i.imgur.com/tVjG4Ym.png' },
        { name: '하동훈', role: 'General Manager', mail:'snowdh@wavus.co.kr', avatar: 'https://i.imgur.com/jZks67w.png' },
        { name: '양재유', role: 'Deputy General Manager', mail:'umeb00@wavus.co.kr', avatar: 'https://i.imgur.com/QRtP5ND.png' },
        { name: '김진형', role: 'Manager', mail:'kimjh@wavus.co.kr', avatar: 'https://i.imgur.com/rRpEXTM.png' },
        { name: '황병주', role: 'Manager', mail:'bjh@wavus.co.kr', avatar: 'https://i.imgur.com/82boscP.png' },
        { name: '한창민', role: 'Developer', mail:'hcmx@wavus.co.kr', avatar: 'https://i.imgur.com/vRG1G9W.png' },
        { name: '임성호', role: 'Developer', mail:'limsungho07@wavus.co.kr', avatar: 'https://i.imgur.com/SUfIPA2.png' },
        { name: '어재승', role: 'Developer', mail:'jason0625@wavus.co.kr', avatar: 'https://i.imgur.com/FvaSUIU.png' },
      ],
    }
  }
}
</script>
