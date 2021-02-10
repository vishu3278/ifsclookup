<template>
    <div id="banks">
        <v-toolbar class="mb-4">
            <v-toolbar-title v-text="title"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field v-model="filterquery" clearable label="Search" hide-details prepend-inner-icon="mdi-magnify"></v-text-field>
        </v-toolbar>
        <v-alert :value="error" color="pink" border="top" icon="mdi-alert" transition="scale-transition"> {{error}}</v-alert>
        <v-card>
            <!-- <v-container> -->
            <v-list v-if="searchFilter.length>0">
                <v-list-item-group>
                    <v-list-item v-for="(bank) in searchFilter" v-bind:key="bank.id">
                        <v-list-item-icon>
                            {{bank.id}}
                        </v-list-item-icon>
                        <v-list-item-content>
                            <!-- <v-list-item-title> -->
                                <router-link :to="{name: 'Branch', params: {bankid: bank.id, bankname: bank.name, fquery: filterquery}}">
                                    {{bank.name}}
                                </router-link>
                            <!-- </v-list-item-title> -->
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
            <v-list v-else>
                <v-list-item-group>
                    <v-list-item v-for="(bank) in banks" v-bind:key="bank.id">
                        <v-list-item-icon>
                            {{bank.id}}
                        </v-list-item-icon>
                        <v-list-item-content>
                            <!-- <v-list-item-title> -->
                                <router-link :to="{name: 'Branch', params: {bankid: bank.id, bankname: bank.name, fquery: filterquery}}">
                                    {{bank.name}}
                                </router-link>
                            <!-- </v-list-item-title> -->
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
            <!-- </v-container> -->
            <v-overlay :value="loading">
                <v-progress-circular indeterminate size="64"></v-progress-circular>
            </v-overlay>
        </v-card>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    name: 'Home',
    data: function() {
        return {
            title: "Banks List",
            banks: [
                { id: 1, name: "Bank of India" },
                { id: 2, name: "State Bank of India" }
            ],
            loading: true,
            error: false,
            errormsg: '',
            filterquery: "",
        }
    },
    components: {

    },
    mounted: function() {
        this.loading = true;
        axios.get('http://wowitprojects.com/ifsclookup/api/index.php')
            .then((response) => {
                console.log(response.data.count);
                this.errror = response.data.count;
                if (response.data.count > 0) {
                    this.banks = response.data.banks;
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
}
</script>
<style scoped>
.v-sheet:hover {
    background: rgba(20, 20, 20, 0.025);
}
</style>