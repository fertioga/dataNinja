<template>
    <div class="container">
        <div class="row">            
            <div class="col">
                <div id="content" class="d-grid gap-2">
                    <hr>
                    <button type="button" class="btn btn-info" @click="btIsClicked">Generate Image</button>
                    <hr>
                </div>
            </div>
        </div>
        <div class="row">
            
            <div class="col">
                <PersonImage :btImageClicked="btClicked" ></PersonImage>
            </div>
        </div>  
    </div>
</template>

<script>
import PersonImage from './PersonImage.vue';
import { dataStore } from '/src/Stores/dataStore.js'

export default {
    name: 'ImageGenerators',
    components: {
        PersonImage
    },
    data() {
        return {
            btClicked: false, // to control the button click
            dataStore: dataStore()
        }
    },
    methods: {
        btIsClicked() {

            // set Loading true
            this.dataStore.setLoadingDuring(2000);

            // set the btClicked to true
            this.btClicked = true;

            // Set the btClicked to false after 1 second
            setTimeout(() => this.btClicked = false, 1000);

        },
    }
};

</script>