<template>
    <checkboxComponent :id="id" :label="label" @is_checked="event_is_check"></checkboxComponent>
</template>
<script>
import { dataStore } from '/src/Stores/dataStore.js';
import { generateName, generateEmail } from '/src/Utils/generate.js';
import checkboxComponent from '/src/js/Components/DataGenerators/Checkbox.vue';

export default {
    components: {
        checkboxComponent
    },   
    data() {
        return {
            name: 'email',
            id: 'check_email',
            label: 'Email',
            tags: 
                [
                    'email',
                    'username',
                    'user_email',
                    'user_email_address',
                    'client_email',
                    'user_name',
                    'e-mail', 
                    'e-mail',
                    'Email', 
                    'E-mail',
                    'e_mail',
                    'email_address',
                    'mail',
                    'mail_address',
                    'email_usuario',
                    'email_cliente',
                    'user_email',
                    'client_email',
                    'reply',
                    'sendto'
                    ],
            is_checked: false,
            dataStore: dataStore()
        }
    },
    props: ['eventBtClicked'],
    watch: {
        eventBtClicked(data) {
            if (data === true && this.is_checked === true) 
                this.processEvent();
            
        }
    },
    methods: {

        /**
         * Process event is check
         * @param {bool} value 
         */
         event_is_check(value) {
            this.is_checked = value;
        },
        
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