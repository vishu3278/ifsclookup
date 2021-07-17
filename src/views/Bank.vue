<template>
    <div id="banks">
        
        <v-sheet v-show="error.type == 'success'" elevation="2" class="px-4 mb-4">
            <v-row align="center">
                <v-col cols="12" sm="8" md="7">
                    <h4 class=" indigo--text text--darken-2">{{bankname}}</h4>
                </v-col>
                <v-col cols="12" sm="2" md="2" class="hidden-sm-and-down">
                    <p>
                        {{title}}
                    </p>
                </v-col>
                <v-col cols="12" sm="4" md="3">
                    <v-select v-model="state" @change="getCities()" :items="states" label="Select State"></v-select>
                    <small v-show="error.show" class="orange--text text--darken-2" > {{error.msg}}</small>
                </v-col>
                <!-- <v-col cols="12" sm="4" md="3">
                    <v-select v-model="city" v-on:change="getBank()" :items="cities" label="Select City"></v-select>
                    <v-autocomplete v-model="city" v-on:change="getBank()" :items="cities" color="white" item-text="name" label="Select City"></v-autocomplete>
                </v-col> -->
            </v-row>
        </v-sheet>
        <v-row>
            <v-col cols="12" sm="8">
                <v-list three-line>
                    <v-list-item  v-for="(branch, index) in branches" :key="index">
                        <v-list-item-content>
                            <v-list-item-title class="indigo--text" v-text="branch.adr1"></v-list-item-title>
                            <v-list-item-subtitle >
                                {{branch.adr2}} - {{branch.city}} - <span v-text="branch.state"></span>
                            </v-list-item-subtitle>
                            <p class="caption mb-2">
                                <v-icon small v-if="branch.contact">mdi-phone</v-icon> {{branch.contact}}
                            </p>
                            <div>
                                <v-chip v-show="branch.ifsc" small label color="light-blue lighten-4 ">
                                    IFSC
                                    <v-divider vertical class="mx-2"></v-divider>
                                    {{branch.ifsc}}
                                </v-chip>
                                <v-chip v-show="branch.micr" class="mx-1" small label color="teal lighten-4">
                                    MICR
                                    <v-divider vertical class="mx-2"></v-divider>
                                    {{branch.micr}}
                                </v-chip>
                            </div>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
                
            </v-col>
            <v-col>
                <v-sheet rounded outlined class="pa-3" color="light-blue lighten-5" style="position:sticky; top:70px;">
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
        <v-btn fab small class="go-up" @click="$vuetify.goTo(0)"><v-icon>mdi-arrow-up</v-icon></v-btn>
    </div>
</template>
<script>
import axios from 'axios';

export default {

    metaInfo() {
        return {
            title: this.bankname,
            meta: [
                { name: 'keywords', content: this.bankname + ' in ' + this.city + ', ' + this.state },
                { name: 'title', content: this.bankname + ' in ' + this.city + ', ' + this.state },
                { name: 'description', content: 'IFSC and MICR Codes of ' + this.bankname + ' in ' + this.city + ', ' + this.state }
            ]
        }
    },
    data: function() {
        return {
            title: this.bankname,
            bankname: '',
            logo: '',
            branches: [
                { id: 1, name: "Bank Name" },
                { id: 2, name: "State Bank" }
            ],
            states: [],
            cities: [],
            state: '',
            city: '',
            loading: false,
            error: {},
            img: "https://loremflickr.com/48/48?random="
        }
    },

    beforeRouteEnter(to, from, next) {
        // console.log(from.name, to.name);

        if (from.name != "Home") {
            // console.log(to, from, next);

            next((vm) => {
                let bankid = to.path.replace('/bank/', '');
                console.log(bankid);
                axios.get(process.env.VUE_APP_ROOT_API + 'index.php?bank_id=' + bankid)
                    .then((response) => {
                        // console.log(response.data.count);
                        vm.errror = response.data.count;
                        if (response.data.count > 0) {
                            vm.bankname = response.data.banks;
                            vm.logo = response.data.logo;
                        } else {
                            vm.error.show = true;
                            vm.error.type = "warning";
                            vm.error.msg = response.data.banks;
                        }
                    })
                    .catch((error) => {
                        vm.error = true;
                        vm.errormsg = error;
                    })
            })
        } else {
            next()
        }
    },
    created: function() {
        this.loading = true;

        this.bankname = this.$route.params.bankname;
        axios.get(process.env.VUE_APP_ROOT_API + 'branches.php?bank_id=' + this.$route.params.bankid)
            .then((response) => {
                if (response.data.count > 1) {
                    this.error.show = true;
                    this.error.type = "success";
                    this.error.msg = response.data.count + " states found for " + this.bankname;
                    // this.branches = response.data.branches;
                    this.states = response.data.state;
                    this.state = response.data.state[0];

                    if (this.state != '') {
                        this.getCities();
                    }

                } else {
                    this.error.show = true;
                    this.error.type = "warning";
                    this.error.msg = "No branches found";
                    // this.error = "No records found";
                }
            })
            .catch((error) => {
                // console.log(error);
                this.error.show = true;
                this.error.type = "warning";
                this.error.msg = error
            })
            .then(() => {
                this.loading = false;
                window.scrollTo(0,0);
                // console.log('always executed');
            });
    },
    mounted: function() {
        // this.bankname = this.$route.params.bankname;
        const fquery = this.$route.params.fquery ? this.$route.params.fquery : '';
        window.localStorage.setItem('fquery', fquery);
    },
    computed: {

    },
    methods: {
        searchFilter: function() {
            this.branches.filter((item) => {
                return item.id < 10;
            });
        },
        getCities: function() {
            this.getBank();
            /*axios.get(process.env.VUE_APP_ROOT_API + 'city.php?bank_id=' + this.$route.params.bankid + '&state=' + this.state)
                .then((response) => {
                    if (response.data.count > 0) {
                        this.cities = response.data.cities;
                        this.city = response.data.cities[0];
                        this.getBank();
                    } else {
                        this.city = 'No city found';
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
                .then(() => {
                    // console.log('always executed')
                    window.scrollTo(0,0);
                })*/
            window.scrollTo(0,0);
        },
        getBank: function() {
            this.loading = true;
            axios.get(process.env.VUE_APP_ROOT_API + 'branch.php?bank_id=' + this.$route.params.bankid + '&state=' + this.state + '&city=' + this.city)

                .then((response) => {
                    if (response.data.count > 0) {
                        this.branches = response.data.banks;
                        this.error.type = "success";

                        this.error.msg = response.data.count + " branch(es) found"
                    } else {
                        this.error.show = true;
                        this.error.type = "warning";
                        this.error.msg = "No branch found for" + this.bankname;
                    }
                })
                .catch((error) => {
                    this.error.show = true;
                    this.error.type = "warning";
                    this.error.msg = error
                }).then(() => {
                    this.loading = false;
                    window.scrollTo(0,0);
                })
        }
    }
}
</script>
<style>
.go-up { position: fixed; bottom: 2em; right: 2em; z-index: 99;}
</style>