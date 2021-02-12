<template>
    <v-app>
        <v-app-bar app color="white">
            <div class="d-flex align-center">
                <v-img alt="Vuetify Name" class="shrink mt-1 " contain min-width="100" src="./assets/logo.png" width="100" />
            </div>
            <v-spacer></v-spacer>
            <router-link to="/" class="btn mx-2">Home</router-link>
            <router-link to="/about" class="btn mx-2">About Us</router-link>
        </v-app-bar>
        <v-main>
            <v-container>
                <router-view />
            </v-container>
        </v-main>
        <v-footer padless color="primary lighten-2 mt-5">
            <v-row justify="center" no-gutters>
                <v-col class="primary lighten-3 py-4 text-center white--text" cols="12">
                    {{ new Date().getFullYear() }} — <strong>IFSC Lookup</strong>
                    <v-btn v-for="(link, index) in links" :key="index" :to="link.url" color="white" text class="my-2">
                        {{ link.text }}
                    </v-btn>
                    <v-container>
                        <p class="text--disabled font-weight-light"><strong>Disclaimer</strong>: We have tried our best to keep the information updated as available from RBI, users are requested to confirm information with the respective bank before using the information provided. The author reserves the right not to be responsible for the topicality, correctness, completeness or quality of the information provided. Liability claims regarding damage caused by the use of any information provided, including any kind of information which is incomplete or incorrect, will therefore be rejected.</p>
                    </v-container>
                </v-col>
                    <v-col class="primary lighten-3 py-4 text-center white--text" cols="12">
                        &copy; {{ new Date().getFullYear() }} — <strong>IFSC Lookup</strong>
                    </v-col>
            </v-row>
        </v-footer>
    </v-app>
</template>
<script>
// import HelloWorld from './components/HelloWorld';

export default {
    name: 'App',
    metaInfo: {
        // if no subcomponents specify a metaInfo.title, this title will be used
        title: 'IFSC Lookup',
        // all titles will be injected into this template
        titleTemplate: '%s | IFSC Lookup'
    },
    components: {
        // HelloWorld,
    },

    data: () => ({
        links: [
            { text: 'Home', url: '/' },
            { text: 'About Us', url: '/about' },
            { text: 'Privacy', url: '/privacy' },
            { text: 'Contact Us', url: '/contact' },
        ],
    }),
};
</script>