<template>
    <footer class="footer">
            <div class="container">
                <div class="block">
                    <div class="buttons are-small is-centered ">
                        <router-link v-for="(link, index) in links" :key="index" :to="link.url" text class="button ">
                            {{ link.text }}
                        </router-link>
                    </div>
                </div>
                <div class="block  has-text-justified">
                    <p><strong>Disclaimer</strong>: We have tried our best to keep the information updated as available from RBI, users are requested to confirm information with the respective bank before using the information provided. The author reserves the right not to be responsible for the topicality, correctness, completeness or quality of the information provided. Liability claims regarding damage caused by the use of any information provided, including any kind of information which is incomplete or incorrect, will therefore be rejected.</p>
                </div>
                <p class="has-text-centered has-text-grey-light">
                    &copy; {{ new Date().getFullYear() }} — <span class="has-text-weight-bold">IFSC Lookup</span>
                </p>
            </div>
        </footer>
</template>
<script>
export default {
    name: 'AppFooter',
    data() {
        return {

        }
    },
    props: ['links']
}
</script>
<style lang="css" scoped>
</style>