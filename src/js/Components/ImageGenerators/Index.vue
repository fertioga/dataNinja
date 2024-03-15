<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <div id="content">
                    <button type="button" class="btn btn-success" @click="btIsClicked">Generate Image</button>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="card w-100">
                    <div class="card-body">
                        <div class="card-text" id="content_result">
                            <PersonImage :btImageClicked="btClicked" ></PersonImage>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    </div>
</template>

<script>
import PersonImage from './PersonImage.vue';

export default {
    name: 'ImageGenerators',
    components: {
        PersonImage
    },
    data() {
        return {
            btClicked: false // to control the button click
        }
    },
    methods: {
        btIsClicked() {

            // set the btClicked to true
            this.btClicked = true;

            // Set the btClicked to false after 1 second
            setTimeout(() => this.btClicked = false, 1000);

        },
    }
};

</script>