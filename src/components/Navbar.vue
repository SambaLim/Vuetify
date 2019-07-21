<template>
    <nav>
        <v-toolbar flat app>
            <v-toolbar-side-icon class="grey--text" @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title class="text-uppercase grey--text">
                <span class="font-weight-light">Todo</span>
                <span>TDS</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-menu offset-y>
                <v-btn flat slot="activator" color="grey">
                    <v-icon left>expand_more</v-icon>
                    <span>Site Links</span>
                </v-btn>
                <v-list>
                    <v-list-tile v-for="site in sites" :key="site.text" @click="goPage(site.url)">
                        <v-list-tile-title>
                            {{ site.text }}
                        </v-list-tile-title>
                    </v-list-tile>
                </v-list>
            </v-menu>

            <v-btn flat color="grey">
                <span>Sign Out</span>
                <v-icon right>exit_to_app</v-icon>
            </v-btn>
        </v-toolbar>

        <v-navigation-drawer app v-model="drawer" class="grey darken-3">
            <v-layout column align-center>
                <v-flex class="mt-5">
                    <v-avatar size="100" class="my-2">
                        <img src="/images/wavus-logo.png" alt="">
                    </v-avatar>
                    <p class="white--text subheading mt-2" style="text-align:center">WRND</p>
                </v-flex>
                <v-flex class="mt-4 mb-3">
                    <Popup />
                </v-flex>
            </v-layout>
            <v-list>
                <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
                    <v-list-tile-action>
                        <v-icon class="white--text">{{ link.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title class="white--text">{{ link.text }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>

<script>
import Popup from './Popup'
export default {
    components: { Popup },
    data() {
        return {
            drawer: false,
            links: [
                { icon: 'dashboard', text: 'Home', route: '/' },
                { icon: 'folder', text: 'My Projects', route: '/projects' },
                { icon: 'person', text: 'Team', route: '/team' },
            ],
            sites: [
                { icon: 'info', text: 'Wavus Site', url: 'http://www.wavus.co.kr/kr/' },
                { icon: 'important_devices', text: 'Dev Wavus', url: 'http://dev.wavus.co.kr:12000/' },
                { icon: 'important_devices', text: 'ISTD', url: 'http://121.160.17.89:8080/istd/' }
            ]
        }
    },
    methods: {
        goPage: function(url) {
            location.href = url;
        }
    }
}
</script>
