<template>
    <div>
        <AppHeader />
        <section class="hero is-small is-info" v-if="hero">
            <div class="hero-body">
                <div class="container">
                    <div class="columns">
                        <div class="column">
                            <p class="title">
                                {{pagetitle}}
                            </p>
                            <p class="subtitle">
                                {{subtitle}}
                            </p>
                        </div>
                        <div class="column is-one-quarter">
                            <AppSearch />
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <main class="main">
            <div class="container">
                <router-view v-on:bankname="updatebankname" v-on:no-hero="displayHero" />
            </div>
        </main>
        <AppFooter :links="links" />
    </div>
</template>
<script>
import AppHeader from '@/components/AppHeader';
import AppSearch from '@/components/AppSearch';
import AppFooter from '@/components/AppFooter';

export default {
    name: 'App',
    metaInfo: {
        // if no subcomponents specify a metaInfo.title, this title will be used
        title: 'IFSC Lookup',
        // all titles will be injected into this template
        titleTemplate: '%s | IFSC Lookup'
    },
    components: {
        AppHeader,
        AppSearch,
        AppFooter,
    },
    data() {
        return {
            pagetitle: 'IFSC Lookup',
            subtitle: 'Look for IFSC and Bank details',
            links: [
                { text: 'Home', url: '/' },
                { text: 'About Us', url: '/about' },
                { text: 'Privacy', url: '/privacy' },
                { text: 'Contact Us', url: '/contact' },
            ],
            menuActive: false,
            hero: true,
        }
    },
    methods: {
        menuToggle() {
            this.menuActive = !this.menuActive
        },
        updatebankname($event){
            this.pagetitle = $event.bankname
            this.subtitle = $event.branchNos + " Branch(es) found"
        },
        displayHero($event){
            this.hero = $event
        }
    }
};
</script>