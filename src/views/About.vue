<template>
    <div id="banks">
        <h1 class="title has-text-centered has-text-info">{{title}}</h1>
        <h3 class="subtitle has-text-centered has-text-info">Welcome to IFSC Lookup</h3>
        <div class="columns">
            <div class="column">
                <p>
                    WOW IT Solutions specialized in Web Designing, UI Engineering, E-Commerce Solutions, Web Portal Development, Mobile Apps Development, Enterprise Application, ERP, CRM and Digital Marketing. We can provide extremely, cost-effective development without compromising on quality, which make us ideally suited for outsourcing your IT needs!</p>
            </div>
            <div class="column">
                <p>
                    We understand the requirements of our clients and consider ourselves as an extension of our client's dreams, aspirations and ideas. Our team of expert designers, programmers, writers, and business developers are able to comprehend and further embellish the ideas of our client.</p>
            </div>
        </div>
        <figure class="image">
            <img src="https://wowitsolutions.com/image/footprint.jpg" contain alt="our footprint" />
        </figure>
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
    created: function() {
        this.$emit('no-hero', false)
    },
    computed: {

    },
    methods: {

    }
}
</script>