<template>
    <div>
        <div class="field">
            <!-- <label>Search</label> -->
            <div class="control has-icons-left">
                <input type="text" class="input" v-model="filterquery" placeholder="Search">
                <span class="icon is-small is-left">
                    <span class="icon-search"></span>
                </span>
            </div>
        </div>
        <div class="notification is-warning is-light" v-show="error">
            <!-- <button class="delete"></button> -->
            {{errormsg}}
        </div>
    </div>
</template>
<script>
export default {
    name: 'AppSearch',
    data() {
        return {
            timeout: null,
            debouncedInput: '',
            error: false,
            errormsg: '',
        }
    },
    computed: {
        filterquery: {
            get() {
                return this.debouncedInput;
            },
            set(val) {
                if (this.timeout) clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    this.debouncedInput = val;
                    this.$store.dispatch('searched', this.debouncedInput)
                }, 600);
            }
        }
    },
}
</script>
<style lang="css" scoped>
</style>