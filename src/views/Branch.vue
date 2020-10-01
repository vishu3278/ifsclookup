<template>
    <div id="banks">
        <h1 class="mb-3 indigo--text text--darken-2">{{bankname}}</h1>
        <v-sheet v-show="error.type == 'success'" elevation="2" class="px-4 mb-4">
            <v-row align="center" >
                <v-col cols="12" sm="4" md="6">
                    <h4 class="">
                        {{title}} 
                    </h4>
                </v-col>
                <v-col cols="12" sm="4" md="3">
                    <v-select v-model="state" @change="getCities()" :items="states" label="Select State"></v-select>
                </v-col>
                <v-col cols="12" sm="4" md="3">
                    <v-select v-model="city" v-on:change="getBank()" :items="cities" label="Select City"></v-select>
                    <!-- <v-autocomplete v-model="city" v-on:change="getBank()" :items="cities" color="white" item-text="name" label="Select City"></v-autocomplete> -->
                </v-col>
            </v-row>
        </v-sheet>
        <v-alert :value="error.show" :type="error.type" text border="left" icon="mdi-alert" transition="scale-transition"> {{error.msg}}</v-alert>
        <v-row>
            <v-col cols="12" sm="6" lg="4" v-for="(branch, index) in branches" :key="index">
                <v-card width="100%">
                    <div class="d-flex flex-no-wrap justify-space-between">
                        <div>
                            <v-card-title class="indigo--text text--darken-2" v-text="branch.adr1"></v-card-title>
                            <v-card-subtitle class="indigo--text pb-0">{{branch.adr2}} - {{branch.city}}<br>
                                <span class="text-overline" v-text="branch.state"></span></v-card-subtitle>
                        </div>
                        <v-avatar class="ma-3" size="80" color="grey lighten-4" tile>
                            <v-img :src="logo" contain></v-img>
                        </v-avatar>
                    </div>
                    <v-card-text class="py-1">
                        <p class="mb-1" v-text="branch.adr5"></p>
                        <p class="mb-0 blue--text text--darken-2 text-subtitle-2">
                            <v-icon small>mdi-card-account-phone-outline</v-icon> {{branch.contact}}
                        </p>
                    </v-card-text>
                    <v-card-actions>
                        <v-chip v-show="branch.ifsc" class="mx-1" small label color="amber ">
                            IFSC
                            <v-divider vertical class="mx-2"></v-divider>
                            {{branch.ifsc}}
                        </v-chip>
                        <v-chip v-show="branch.micr" class="mx-1" small label color="orange lighten-2">
                            MICR
                            <v-divider vertical class="mx-2"></v-divider>
                            {{branch.micr}}
                        </v-chip>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
        <v-overlay :value="loading">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </div>
</template>
<script>
import axios from 'axios';

export default {
    metaInfo() {
        return {  
            title: 'Filter by State and City',
            meta: [
                { name: 'keywords', content: this.bankname + ' in ' + this.city + ', ' + this.state },
                { name: 'title', content: this.bankname + ' in ' + this.city + ', ' + this.state },
                { name: 'description', content: 'IFSC and MICR Codes of ' + this.bankname + ' in '+ this.city + ', ' + this.state }
            ]
        }
    },
    data: function() {
        return {
            title: "Filter by State and City",
            bankname: '',
            logo:'',
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
            console.log(to, from, next);
            
            next((vm)=>{
                let bankid = to.path.replace('/bank/','');
                console.log(bankid);
                axios.get(process.env.VUE_APP_ROOT_API + 'index.php?bank_id=' + bankid)
                .then((response) => {
                    // console.log(response.data.count);
                    vm.errror = response.data.count;
                    if (response.data.count > 0) {
                        vm.bankname = response.data.banks;
                        vm.logo = response.data.logo;
                    }else{
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
        }else {
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
                // console.log('always executed');
            });
    },
    mounted: function() {
        // this.bankname = this.$route.params.bankname;
        const fquery = this.$route.params.fquery?this.$route.params.fquery:'';
        window.localStorage.setItem('fquery', fquery);

        /*if (this.city) {
            this.getCities()
        }*/
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
            axios.get(process.env.VUE_APP_ROOT_API + 'city.php?bank_id=' + this.$route.params.bankid + '&state=' + this.state)
            .then((response)=>{
                if (response.data.count > 0) {
                    this.cities = response.data.cities;
                    this.city = response.data.cities[0];
                    this.getBank();
                } else {
                    this.city = 'No city found';
                }
            })
            .catch((error)=>{
                console.log(error)
            })
            .then(()=>{
                console.log('always executed')
            })
        },
        getBank: function() {
            this.loading = true;
            axios.get(process.env.VUE_APP_ROOT_API + 'branch.php?bank_id=' + this.$route.params.bankid + '&state=' + this.state + '&city=' + this.city)
                .then((response) => {
                    if (response.data.count > 0) {
                        this.branches = response.data.banks;
                        this.error.type = "success";
                        this.error.msg = response.data.count + " branche(s) found"
                    } else {
                        this.error.show = true;
                        this.error.type = "warning";
                        this.error.msg = "No branches found for" + this.bankname;
                    }
                })
                .catch((error) => {
                    this.error.show = true;
                    this.error.type = "warning";
                    this.error.msg = error
                }).then(() => {
                    this.loading = false;
                })
        }
    }
}
</script>