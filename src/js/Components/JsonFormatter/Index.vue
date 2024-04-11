<template>
    <div style="position: relative;">
        <textarea class="form-control" v-model="jsonInput" id="textarea_json" rows="20" cols="50"></textarea>
        <button type="button" class="btn btn-success" @click="formatJson">Format JSON</button>

        <div id="copy_group" style="position: absolute; top: 10px; right: 10px;">
            <font-awesome-icon icon="copy" v-if="!content_copied" title="Copy" @click="copy()" style="cursor: pointer;" /> 
            <span v-if="content_copied" style="margin-left: 5px; color: green;">Copied!</span>
        </div>       
        
        <div v-if="errorMessage" class="alert alert-danger" role="alert">
            {{ errorMessage }}
        </div>
    </div>
</template>
<script>

import { dataStore } from '/src/Stores/dataStore.js';

export default {
    name: 'JsonFormatter',
    data() {
        return {
            jsonInput: '',
            content_copied: false,
            dataStore: dataStore(),
            errorMessage: ''
        };
    },
    methods: {
        formatJson() {

            // set Loading true
            this.dataStore.setLoadingDuring(1000);
            this.errorMessage = '';

            try {
                this.jsonInput = JSON.stringify(JSON.parse(this.jsonInput), null, 2);
            } catch (e) {
                this.errorMessage = 'Invalid JSON ' + e;
            }
        },

        /** 
         * Copy the content of the textarea to the clipboard
         */
        copy() {       

            navigator.clipboard.writeText(this.jsonInput); // Copy to clipboard                

            this.animationWhenCopy();
        },

        /**
         * Put an animation in the field that was copied
         */
        animationWhenCopy(){

            this.content_copied = true;

            setTimeout(() => { this.content_copied=false }, 1000);
            
        },
    },
};
</script>

<style scoped>
/* Add your styles here */
</style>