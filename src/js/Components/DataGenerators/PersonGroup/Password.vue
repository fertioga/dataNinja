<template>
    <checkboxComponent :id="id" :label="label" @is_checked="event_is_check"></checkboxComponent>
</template>
<script>
import { dataStore } from '/src/Stores/dataStore.js';
import { generateSecurePassword } from '/src/Utils/generate.js';
import checkboxComponent from '/src/js/Components/DataGenerators/Checkbox.vue';

export default {
    components: {
        checkboxComponent
    },   
    data() {
        return {
            name: 'password',
            id: 'check_password',
            label: 'Password',
            tags: [
                'password',
                'senha',
                'password',
                'senha',
                'user_password',
                'user_senha',
                'senha_usuario',
                'password_user',
                'pass',
                'passcode',
                'access_password',
                'access_code',
                'access_key',
                'secret',
                'private_key',
                'confidential',
                'confidencial',
                'security_key',
                'security_code'
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

            this.$emit('event_data', this.getPassword());
        },

        getPassword() {
           
            const password = generateSecurePassword();

                this.dataStore.add(
                    this.name,
                    password
                );

                return {
                    "field": this.name,
                    "tags": this.tags,
                    "value": password
                }
        }
    }
}
</script>