<template>
    <div id="banks">
        <h1 class="mb-3 indigo--text text--darken-2">{{title}}</h1>
        <v-row>
            <v-col cols="12" class="body-1">Welcome to WOW IT Solutions</v-col>
            <v-col sm="6" cols="12">
                <p>
                    WOW IT Solutions specialized in Web Designing, UI Engineering, E-Commerce Solutions, Web Portal Development, Mobile Apps Development, Enterprise Application, ERP, CRM and Digital Marketing. We can provide extremely, cost-effective development without compromising on quality, which make us ideally suited for outsourcing your IT needs!</p>
            </v-col>
            <v-col sm="6" cols="12">
                <p>
                    We understand the requirements of our clients and consider ourselves as an extension of our client's dreams, aspirations and ideas. Our team of expert designers, programmers, writers, and business developers are able to comprehend and further embellish the ideas of our client.</p>
            </v-col>
            <v-col cols="12">
                <v-img src="https://wowitsolutions.com/image/footprint.jpg" contain alt="our footprint"></v-img>
            </v-col>
        </v-row>
        <v-alert :value="error.show" :type="error.type" text border="left" icon="mdi-alert" transition="scale-transition"> {{error.msg}}</v-alert>
        <v-overlay :value="loading">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            title: "About",
            loading: false,
            error: {
                show: false
            },
        }
    },
    created: function() {},
    computed: {

    },
    methods: {

    }
}
</script>