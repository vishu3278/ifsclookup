<template>
    <div id="banks">
        <v-toolbar class="mb-4">
            <v-toolbar-title v-text="title"></v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field v-model="filterquery" clearable label="Search" hide-details prepend-inner-icon="mdi-magnify"></v-text-field>
        </v-toolbar>
        <v-alert :value="error" color="pink" border="top" icon="mdi-alert" transition="scale-transition"> {{error}}</v-alert>
        <section class="panel">
            <v-row>
                <v-col md="9" cols="12">
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
                </v-col>
                <v-col>
                    <v-sheet rounded outlined class="pa-3" color="light-blue lighten-5">
                        <p class="text--secondary"><strong>IFSC</strong> code is allotted by the Reserve Bank of India (RBI) to all banks and its branches. The IFSC code of a bank can be commonly found on a bank account passbook, cheque leaf issued by the bank or on the RBI website. Any kind of fund transfer through a bank requires a valid IFSC. The different types of fund transfers are NEFT, RTGS and IMPS.</p>
                        <h3>How to find IFSC Code?</h3>
                        <p class="text--secondary">IFSC code can be found on cheque leaf and bank passbook of the respective bank. Banks and respective branch list of IFSC codes can be obtained from Reserve Bank of India’s website. The IFSC code of a particular bank can also be found on the banks’ official website.</p>
                        <p class="text--secondary"><strong>MICR</strong> Code (Magnetic Ink Character Recognition) as printed on cheque book to facilitate the processing of cheques.</p>
                    </v-sheet>
                </v-col>
            </v-row>
            <v-overlay :value="loading">
                <v-progress-circular indeterminate size="64"></v-progress-circular>
            </v-overlay>
        </section>
    </div>
</template>
<script>
import axios from 'axios';

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
            filterquery: "",
        }
    },
    components: {

    },
    mounted: function() {
        this.loading = true;
        /*axios.get(process.env.VUE_APP_ROOT_API + 'index.php')*/
        axios.get('http://wowitprojects.com/ifsclookup/api/index.php')
            .then((response) => {
                // console.log(response.data.count);
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