<template>
    <div id="banks">
        <h1 class="mb-3 is-size-4 has-text-centered has-text-info">{{title}}</h1>
        <figure class="image">
            <img src="https://wowitsolutions.com/image/footprint.jpg" class="" alt="our footprint">
        </figure>
    </div>
</template>
<script>
export default {
    data: function() {
        return {
            title: "Contact",
        }
    },
    created() {
        this.$emit('no-hero', false)
    },
    computed: {

    },
    methods: {

    }
}
</script>