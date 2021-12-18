<template>
    <div id="banks">
        <!-- <v-toolbar class="mb-4">
            <v-toolbar-title v-text="title" class="hidden-sm-and-down"></v-toolbar-title>
            <v-spacer class="hidden-sm-and-down"></v-spacer>
            <v-text-field v-model="filterquery" clearable label="Search" hide-details prepend-inner-icon="mdi-magnify"></v-text-field>
        </v-toolbar>
        <v-alert :value="error" color="pink" border="top" icon="mdi-alert" transition="scale-transition"> {{error}}</v-alert> -->
        <div class="columns">
            <div class="column">
                <section class="panel p-3">
                    <template v-if="searchFilter.length>0">
                        <article class="media" v-for="(bank, index) in searchFilter" v-bind:key="index">
                            <div class="media-left" >
                                {{bank.id}}
                            </div>
                            <div class="media-content">
                                <router-link :to="{name: 'Bank', params: {bankid: bank.id, bankname: bank.name, slug: bank.slug, fquery: filterquery}}" class="grey--text text--darken-3">
                                    {{bank.name}}
                                </router-link>
                            </div>
                        </article>
                    </template>
                    <template v-else>
                        <article v-for="(bank, index) in banks" v-bind:key="index">
                            <div class="media-left" >
                                {{bank.id}}
                            </div>
                            <div class="media-content">
                                <router-link :to="{name: 'Bank', params: {bankid: bank.id, bankname: bank.name, slug: bank.slug, fquery: filterquery}}" class="blue-grey--text text--darken-3">
                                    {{bank.name}}
                                </router-link>
                            </div>
                        </article>
                    </template>
                </section>
            </div>
            <div class="column is-two-fifths">
                <AppSidebar />
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import AppSidebar from '@/components/AppSidebar'

export default {
    name: 'Home',
    metaInfo() {
        return {
            meta: [
                { name: 'keywords', content: 'IFSC code, MICR code, Bank details, Search Bank' },
                { name: 'title', content: 'IFSC and MICR code' },
                { name: 'description', content: 'Search IFSC and MICR Codes of banks from all over India' }
            ]
        }
    },
    data: function() {
        return {
            title: "Banks",
            banks: [
                { id: 1, name: "Bank of India" },
                { id: 2, name: "State Bank" }
            ],
            loading: true,
            error: false,
            errormsg: '',
            filterquery: null,
        }
    },
    components: {
        AppSidebar
    },
    mounted: function() {
        this.loading = true;
        if (window.sessionStorage.getItem('banks')) {
            this.banks = JSON.parse(window.sessionStorage.getItem('banks'));
            this.loading = false;
        } else {
            /*axios.get(process.env.VUE_APP_ROOT_API + 'index.php')*/
            axios.get(process.env.VUE_APP_ROOT_API + 'index.php')
                .then((response) => {
                    // console.log(response.data.count);
                    this.errror = response.data.count;
                    if (response.data.count > 0) {
                        this.banks = response.data.banks;
                        let banks = JSON.stringify(this.banks);
                        window.sessionStorage.setItem('banks', banks);
                    } else {
                        this.error = true;
                        this.errormsg = 'some error occurred';
                    }
                })
                .catch((error) => {
                    console.log(error);
                    this.error = true;
                    this.errormsg = error;
                })
                .then(() => {
                    this.loading = false;
                });
        }
        this.filterquery = window.localStorage.getItem('fquery');
    },
    computed: {
        searchFilter: function() {
            var regex = new RegExp(this.filterquery, 'gi');
            let newarray = this.banks.filter((item) => {
                return item.name.match(regex);
            });
            return newarray
        },

    },
    methods: {
        slug(bankname) {
            return bankname.toLowerCase().replace(/[ ]/g, '-')
        }
    }
}
</script>
<style scoped>
a {
    text-decoration: none;
}
</style>