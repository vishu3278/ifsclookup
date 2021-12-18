<template>
    <div>
        <div class="field">
            <!-- <label>Search</label> -->
            <div class="control has-icons-left">
                <input type="text" class="input" v-model="filterquery" placeholder="Search">
                <span class="icon is-small is-left">
                    <span class="icon icon-search"></span>
                    <!-- <i class="fas fa-user"></i> -->
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
            error: false,
            errormsg: '',
            filterquery: null,
        }
    }
}
</script>
<style lang="css" scoped>
</style>