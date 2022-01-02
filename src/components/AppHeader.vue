<template>
    <nav class="navbar is-light is-fixed-top has-shadow" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <a class="navbar-item" href="/">
                <img src="@/assets/logo.png" width="66" height="28">
            </a>
            <a role="button" class="navbar-burger" aria-label="menu" v-on:click="menuToggle">
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
            </a>
        </div>
        <div id="navbarBasicExample" class="navbar-menu" v-bind:class="{'is-active': menuActive}">
            <div class="navbar-start">
            </div>
            <div class="navbar-end">
                <!-- <div class="navbar-item"> -->
                <router-link to="/" exact active-class="red--text" class="navbar-item">Home</router-link>
                <router-link to="/about" active-class="red--text" class="navbar-item">About Us</router-link>
                <router-link to="/contact" active-class="red--text" class="navbar-item">Contact</router-link>
            </div>
        </div>
    </nav>
</template>
<script>
export default {
    name: 'AppHeader',
    data() {
        return {
            menuActive: false
        }
    },
    // props: ['links']
    methods: {
        menuToggle(){
            console.log('menu toggle')
            this.menuActive = !this.menuActive
        }
    }
}
</script>
<style lang="css" scoped>
</style>