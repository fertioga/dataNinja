<template>
    <div class="form-check">
        <input class="form-check-input" v-model="is_check_email" type="checkbox" value="" id="check_email">
        <label class="form-check-label" for="check_email">
            Email
        </label>
    </div>
</template>
<script>
import { dataStore } from '/src/Stores/dataStore.js';
import { generateName, generateEmail } from '/src/Utils/generate.js';

export default {
    data() {
        return {
            name: 'email',
            tags: 
                [
                    'email',
                    'username',
                    'user_email',
                    'user_email_address',
                    'client_email',
                    'user_name',
                    'email',
                    'e-mail', 
                    'e-mail',
                    'Email', 
                    'E-mail',
                    'e_mail', 
                    'e_mail',
                    'E_mail',
                    'email_address',
                    'mail',
                    'mail_address',
                    'endereco_email',
                    'endereco_mail',
                    'email_usuario',
                    'email_cliente',
                    'email_empresa',
                    'endereco_email_usuario',
                    'endereco_email_cliente',
                    'endereco_email_empresa',
                    'user_email',
                    'client_email',
                    'company_email',
                    'user_email_address',
                    'client_email_address',
                    'company_email_address'
                    ],
            is_check_email: false,
            dataStore: dataStore()
        }
    },
    props: ['eventBtClicked'],
    watch: {
        eventBtClicked(data) {
            if (data === true && this.is_check_email === true) 
                this.processEvent();
            
        }
    },
    methods: {
        processEvent() {
            this.getEmail().then((result)=>{
                this.$emit('event_data', result);
            }).catch((error)=>{
                console.log(error);
            });
        },

        async getEmail() {

            const result = await new Promise(resolve => {

                // Simulate a delay to mount the name and email in store    
                setTimeout(() => {

                    //first verify if the name is in store  
                    if (this.dataStore.keyExists('email')) {

                        resolve({
                            "field": "email",
                            "tags": this.tags,
                            "value": this.dataStore.getByKey('email')[0].value
                        });
                        
                    } else {
                        
                        // get the generated name from Utils/generate.js
                        generateName().then((completeName) => {
                            resolve({
                                "field": "email",
                                "tags": this.tags,
                                "value": generateEmail(completeName)
                            });
                        }).catch((error) => {
                            console.error('Error get name:', error);
                        });
                        
                    }
                }, 500);
            });
           
            return result;
        }
    }
}
</script>