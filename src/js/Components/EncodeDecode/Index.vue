<template>
    <div>
        <div class="row">
            <div class="col-md-6">
                <label for="text">Text</label>
                <textarea class="form-control" v-model="text" id="text" placeholder="Put your text here"></textarea>
            </div>  
        </div>        

        <div class="row">
                <div class="col-md-6" style="max-width: 47%;">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" v-model="ckEncodeDecode" value="encode64" name="ckEncodeDecode" id="encode64">
                        <label class="form-check-label" for="encode64">
                            Enc. Base64
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" v-model="ckEncodeDecode" value="decode64" name="ckEncodeDecode" id="decode64" >
                        <label class="form-check-label" for="decode64">
                            Dec. Base64
                        </label>
                    </div>
                </div>  
                <div class="col-md-6" style="max-width: 47%;">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" v-model="ckEncodeDecode" value="encodeSha1" name="ckEncodeDecode" id="encodeSha1">
                        <label class="form-check-label" for="encodeSha1">
                            Enc. SHA1
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" v-model="ckEncodeDecode" value="encodeSha2" name="ckEncodeDecode" id="encodeSha2">
                        <label class="form-check-label" for="encodeSha2">
                            Enc. SHA2
                        </label>
                    </div>
                </div>  
        </div>  
        <div class="row">
            <div class="col-md-6">
                <button class="btn btn-info" @click="encodeDecode">Encode/Decode</button>
            </div>
        </div>
        <div class="row" v-if="result">
            <div style="position: relative;">
                <textarea class="form-control" v-model="result" id="textarea_result" rows="5" cols="50"></textarea>

                <div id="copy_group" style="position: absolute; top: 10px; right: 10px;">
                    <font-awesome-icon icon="copy" v-if="!content_copied" title="Copy" @click="copy()" style="cursor: pointer;" /> 
                    <span v-if="content_copied" style="margin-left: 5px; color: green;">Copied!</span>
                </div>    
            </div>
        </div>
    </div>

</template>

<script>
    import forge from 'node-forge';

    export default {
        data() {
            return {
                text: '',
                result: '',
                ckEncodeDecode: '',
                content_copied: false,
            }
        },
        methods: {
            /**
             * Encode or decode the text according to the selected option
             */
            encodeDecode() {

                if (this.ckEncodeDecode == 'encode64') {
                    this.result = ""
                    this.result = btoa(this.text.trim());
                    return;
                }
                
                if(this.ckEncodeDecode == 'decode64'){
                    this.result = ""
                    this.result = atob(this.text.trim());
                    return;
                }           
                
                if(this.ckEncodeDecode == 'encodeSha1'){
                    this.result = ""
                    this.result = this.sha1Encode(this.text.trim());
                    return;
                }

                if(this.ckEncodeDecode == 'encodeSha2'){
                    this.result = ""
                    this.result = this.sha256Encode(this.text.trim());
                    return;
                }
                
            },

            /**
             * Encode the input text to SHA1
             * @param {string} input 
             */
            sha1Encode(input) {
                const md = forge.md.sha1.create();
                md.update(input, 'utf8');
                return md.digest().toHex();
            },

            /**
             * Encode the input text to SHA256
             * @param {string} input 
             */
            sha256Encode(input) {
                const md = forge.md.sha256.create();
                md.update(input, 'utf8');
                return md.digest().toHex();
            },

            /** 
             * Copy the content of the textarea to the clipboard
             */
            copy() {       

                navigator.clipboard.writeText(this.result); // Copy to clipboard                

                this.animationWhenCopy();
                },

            /**
            * Put an animation in the field that was copied
            */
            animationWhenCopy(){

                this.content_copied = true;

                setTimeout(() => { this.content_copied=false }, 1000);

            },
        }   
    }
</script>