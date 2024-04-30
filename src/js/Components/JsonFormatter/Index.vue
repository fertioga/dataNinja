<template>
    <div class="container" data-bs-theme="dark">
        <div class="row">        
            <div class="col-md-6" style="width: 45%;">
                <label for="textarea_json" class="form-label>">JSON:</label>
            </div>
            <div id="copy_group_json" class="col-md-6" style="width: 45%;">
                <div style="float: right;">
                    <font-awesome-icon icon="copy" v-if="!content_copied" title="Copy" @click="copy()" style="cursor: pointer; color: #74A8A3;" /> 
                    <span v-if="content_copied" style="margin-left: 5px; color: green;">Copied!</span>
                </div>       
            </div>
        </div>  

        <textarea class="form-control" placeholder="Paste here." v-model="jsonInput" id="textarea_json" rows="20"></textarea>

        <div id="content" class="d-grid gap-2">
            <hr>
                <button type="button" class="btn btn-info" @click="formatJson">Format JSON</button>
            <hr>
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
<style>
 #copy_group_json {
    position: absolute;
    right: 16px;
    margin-top: 32px;
}
</style>