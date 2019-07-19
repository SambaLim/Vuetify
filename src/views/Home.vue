<template>
  <div class="home">
    <h1 class="subheading grey--text">Home</h1>

    <v-container class="my-5">
      <v-card flat v-for="project in projects" :key="project.title">
        <v-layout row wrap :class="`pa-3 project ${project.status}`">
          <v-flex xs12 md6>
              <div class="caption grey--text">Project title</div>
              <div>{{ project.title }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Person</div>
            <div>{{ project.person }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Due by</div>
            <div>{{ project.due }}</div>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="right">
              <v-chip small :class="`${project.status} white--text caption ma-2`">{{ project.status }}</v-chip>
            </div>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: [
        { title: 'Select Cube Solid', person: 'Samba', due: '2019-07-18', status: 'complete', content: 'Create Select Cube Solid and get Event in CesiumJS'},
        { title: 'Enviroment Settings', person: 'Samba', due: '2019-07-18', status: 'ongoing', content: 'Enviroment Settings for 3DS'},
        { title: 'Get Mouse Event in ThreeJS', person: 'Samba', due: '2019-07-22', status: 'overdue', content: 'Get Mouse Event in ThreeJS'},
        { title: 'Draw Vworld 3D Data', person: 'Samba', due: '2019-07-26', status: 'ongoing', content: 'Draw Vworld 3D Data with CesiumJS or ThreeJS'},
        { title: '3D Data Grouping', person: 'Samba', due: '2019-07-26', status: 'ongoing', content: '3D Data Grouping in CesiumJS and ThreeJS'},
      ]
    };
  }
}
</script>

<style>
.project.complete {
  border-left: 4px solid #3cd1c2;
}

.project.ongoing {
  border-left: 4px solid orange;
}

.project.overdue {
  border-left: 4px solid tomato;
}
.v-chip.complete {
  background: #3cd1c2;
}

.v-chip.ongoing {
  background: orange;
}

.v-chip.overdue {
  background: tomato;
}

</style>
