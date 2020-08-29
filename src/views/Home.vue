<template>
    <div id="banks">
        <div class="loading" v-show="loading"><img src="loading.svg" /></div>
        <nav class="panel">
            <p class="panel-heading" v-text="title"></p>
            <div class="panel-block" v-if="error" v-text="error"></div>
            <div class="panel-block">
                <p class="control has-icons-left">
                    <input class="input" type="text" v-model="filterquery" placeholder="Search">
                    <span class="icon is-left">
                        <i class="las la-search" aria-hidden="true"></i>
                    </span>
                </p>
            </div>
            <div v-if="searchFilter.length>0">
                <router-link :to="{name: 'branches', params: {bankid: bank.id}}" v-for="(bank) in searchFilter" v-bind:key="bank.id" class="panel-block ">
                    <span class="panel-icon" v-text="bank.id">
                    </span> {{bank.name}}
                </router-link>
            </div>
            <div v-else>
                <router-link :to="{name: 'branches', params: {bankid: bank.id}}" v-for="(bank) in banks" v-bind:key="bank.id" class="panel-block ">
                    <span class="panel-icon" v-text="bank.id">
                    </span> {{bank.name}}
                </router-link>
            </div>
        </nav>
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
            error: "",
            filterquery: "",
        }
    },
    components: {

    },
    mounted: function() {
        this.loading = true;
        axios.get('http://localhost/ifsc/api/index.php')
            .then((response) => {
                console.log(response.data.count);
                this.errror = response.data.count;
                if (response.data.count > 0) {
                    // $emit('showMessage', response.data.count + ' records found');
                    // this.error = response.data.count + " records found";
                    this.banks = response.data.banks;
                } else {
                    // $emit('showMessage', 'No records found');
                    // this.error = "No records found";
                }
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
            .then(() => {
                // always executed
                // this.error = "ajax request complete";
                this.loading = false;
                // console.log('always executed');
            });
    },
    computed: {
        searchFilter: function() {
            var regex = new RegExp(this.filterquery, 'gi');
            let newarray = this.banks.filter((item) => {
                return item.name.match(regex);
            });
            // this.filtered = newarray;
            return newarray
        },
        /*filteredResult: function() {
            return this.filtered = this.searchFilter;
        }*/
    },
}
</script>