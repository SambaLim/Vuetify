<template>
  <div class="home">
    <h1 class="subheading grey--text">Home</h1>

    <v-container class="my-5">
      <v-card flat class="pa-3" v-for="i in 3" :key="i">
        <v-layout row wrap>
          <!-- title-->
          <v-flex xs12 md6>
              <div class="caption grey--text">Project title</div>
              <div>Create new Website</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Person</div>
            <div>SambaLim</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Due by</div>
            <div>19th July 2019</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Status</div>
            <div>On Going</div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {

}
</script>
