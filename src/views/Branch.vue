<template>
    <div id="branch">
        <div class="columns">
            <div class="column">
                <div v-show="error.type == 'success'" class="notification is-warning">
                    <div class="level">
                        <div class="level-left"><label class="is-size-7 mr-2">Select State</label> 
                            <div class="control has-icons-left">
                                <div class="select is-small">
                                    <select v-model="state" @change="getCities()">
                                        <option :value="s" v-for="s in states" :key="s">{{s}}</option>
                                    </select>
                                </div>
                                <div class="icon is-left">
                                    <span class="icon-globe"></span>
                                </div>
                            </div>
                        </div>
                        <div class="level-right"><small v-show="error.show"> {{error.msg}}</small></div>
                    </div>
                </div>
                <section class="panel p-3">
                    <article class="media" v-for="(branch, index) in branches" :key="index">
                        <div class="media-content">
                            <h6 class="m-0 has-text-primary-dark has-text-weight-bold" v-text="branch.adr1"></h6>
                            <p class="m-0 has-text-info">
                                {{branch.adr2}} - {{branch.city}} - <span v-text="branch.state"></span>
                            </p>
                            <p class="m-0" style="word-break: break-all">
                                {{branch.adr5}}
                            </p>
                            <p class="mb-2">
                                <span class="icon icon-phone" v-if="branch.contact"></span> {{branch.contact}}
                            </p>
                            <div class="field is-grouped">
                                <div class="control" v-show="branch.ifsc">
                                    <div class="tags has-addons">
                                        <span class="tag ">IFSC</span>
                                        <span class="tag is-link is-light">{{branch.ifsc}}</span>
                                    </div>
                                </div>
                                <div class="control" v-show="branch.micr">
                                    <div class="tags has-addons">
                                        <span class="tag">MICR</span>
                                        <span class="tag is-info is-light">{{branch.micr}}</span>
                                    </div>
                                </div>
                                <!-- <v-chip v-show="branch.ifsc" small label color="light-blue lighten-4 ">
                                    IFSC
                                    <v-divider vertical class="mx-2"></v-divider>
                                    {{branch.ifsc}}
                                </v-chip> -->
                                <!-- <v-chip v-show="branch.micr" class="mx-1" small label color="teal lighten-4">
                                    MICR
                                    <v-divider vertical class="mx-2"></v-divider>
                                    {{branch.micr}}
                                </v-chip> -->
                            </div>
                        </div>
                        <figure class="media-right image is-64x64">
                            {{branch.id}}
                        </figure>
                    </article>
                </section>
            </div>
            <div class="column is-two-fifths">
                <AppSidebar />
            </div>
        </div>
        <v-overlay :value="loading">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </div>
</template>
<script>
import axios from 'axios';
import AppSidebar from '@/components/AppSidebar'

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
    components: {
        AppSidebar
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
                window.scrollTo(0, 0);
                // console.log('always executed');
            });
    },
    mounted: function() {
        // this.bankname = this.$route.params.bankname;
        const fquery = this.$route.params.fquery ? this.$route.params.fquery : '';
        window.localStorage.setItem('fquery', fquery);
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
            window.scrollTo(0, 0);
        },
        getBank: function() {
            this.loading = true;
            axios.get(process.env.VUE_APP_ROOT_API + 'branch.php?bank_id=' + this.$route.params.bankid + '&state=' + this.state + '&city=' + this.city)

                .then((response) => {
                    if (response.data.count > 0) {
                        this.branches = response.data.banks;
                        this.error.type = "success";
                        this.error.msg = response.data.count + " branch(es) found"
                        this.$emit('bankname', { bankname: this.bankname, branchNos: response.data.count })

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
                    window.scrollTo(0, 0);
                })
        }
    }
}
</script>
<style scoped>
/*.media-right {
    flex-basis: 10%;
}*/
</style>