<template>
  <div class="login">
    <v-container class="my-5">
        <v-layout align-center justify-center>
            <v-card class="pa-5" align-center>
                <v-card-title class="justify-center">
                    <h2>Chat Login</h2>
                </v-card-title>
                <v-card-text class="my-5">
                    <v-text-field label="Enter your name" v-model="userName" prepend-icon="face" :rules="inputRules"></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="success" @click="submit">Submit</v-btn>
                </v-card-actions>
          </v-card>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
export default {
    data() {
        return {
            userName: '',
            inputRules: [
                v => v.length >= 3 || 'Minimum length is 3 characters'
            ],
        }
    },
    methods: {
        submit: function() {
            if(this.userName.length < 3) return;

            console.log(this.userName)
        }
    }
}
</script>
<style>
</style>
