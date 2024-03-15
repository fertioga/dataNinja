<template>
    <img v-if="visible" :src=image class="img-fluid" alt="Data Ninja Image Fake">
</template>
<script>

import { generatePersonImage } from '/src/Utils/generate.js';

export default {
    data() {
        return {
            name: 'PersonImage',
            image: null,
            visible: false
        }
    },
    props: ['btImageClicked'],
    watch: {
        btImageClicked(data) {
            if(data === true)
                this.getPersonImage();
        }
    },
    methods: {

        async getPersonImage() {        

            this.visible = false;
            this.image = await generatePersonImage();       
            this.visible = true;     
        }
    }
}
</script>