<template>
    <div>
        <nav class="navbar is-light is-fixed-top has-shadow" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item" href="/">
                    <img src="./assets/logo.png" width="66" height="28">
                </a>
                <a role="button" class="navbar-burger" aria-label="menu" v-on:click="menuToggle">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div id="navbarBasicExample" class="navbar-menu" v-bind:class="{'is-active': menuActive}">
                <div class="navbar-start">
                    <!-- <a class="navbar-item">
                    Home
                </a>
                <a class="navbar-item">
                    Documentation
                </a> -->
                    <!-- <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link">
                        More
                    </a>
                    <div class="navbar-dropdown">
                        <a class="navbar-item">
                            About
                        </a>
                        <a class="navbar-item">
                            Jobs
                        </a>
                        <a class="navbar-item">
                            Contact
                        </a>
                        <hr class="navbar-divider">
                        <a class="navbar-item">
                            Report an issue
                        </a>
                    </div>
                </div> -->
                </div>
                <div class="navbar-end">
                    <!-- <div class="navbar-item"> -->
                    <router-link to="/" exact active-class="red--text" class="navbar-item">Home</router-link>
                    <router-link to="/about" active-class="red--text" class="navbar-item">About Us</router-link>
                    <!-- <div class="buttons">
                        <a class="button is-primary">
                            <strong>Sign up</strong>
                        </a>
                        <a class="button is-light">
                            Log in
                        </a>
                    </div> -->
                    <!-- </div> -->
                </div>
            </div>
        </nav>
        <section class="hero is-small is-info">
            <div class="hero-body">
                <p class="title">
                    IFSC Lookup
                </p>
                <p class="subtitle">
                    Look for IFSC and Bank details
                </p>
            </div>
        </section>
        <main class="main">
            <div class="container">
                <router-view />
            </div>
        </main>
        <footer class="footer">
            <div class="container">
                <div class="block">
                    <div class="buttons are-small is-centered ">
                        <router-link v-for="(link, index) in links" :key="index" :to="link.url" text class="button ">
                            {{ link.text }}
                        </router-link>
                    </div>
                </div>
                <div class="block  has-text-justified">
                    <p><strong>Disclaimer</strong>: We have tried our best to keep the information updated as available from RBI, users are requested to confirm information with the respective bank before using the information provided. The author reserves the right not to be responsible for the topicality, correctness, completeness or quality of the information provided. Liability claims regarding damage caused by the use of any information provided, including any kind of information which is incomplete or incorrect, will therefore be rejected.</p>
                </div>
                <p class="has-text-centered has-text-grey-light">
                    &copy; {{ new Date().getFullYear() }} — <span class="has-text-weight-bold">IFSC Lookup</span>
                </p>
            </div>
        </footer>
    </div>
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
    data() {
        return {
            links: [
                { text: 'Home', url: '/' },
                { text: 'About Us', url: '/about' },
                { text: 'Privacy', url: '/privacy' },
                { text: 'Contact Us', url: '/contact' },
            ],
            menuActive: false
        }
    },
    methods: {
        menuToggle() {
            this.menuActive = !this.menuActive
        }
    }
};
</script>