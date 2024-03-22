<template>
    <div class="form-check">
        <input class="form-check-input" v-model="is_check_password" type="checkbox" value="" id="check_password">
        <label class="form-check-label" for="check_password">
            Password
        </label>
    </div>
</template>
<script>
import { dataStore } from '/src/Stores/dataStore.js';
import { generateSecurePassword } from '/src/Utils/generate.js';

export default {
    data() {
        return {
            name: 'password',
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
            is_check_cpf: false,
            dataStore: dataStore()
        }
    },
    props: ['eventBtClicked'],
    watch: {
        eventBtClicked(data) {
            if (data === true && this.is_check_password === true) 
                this.processEvent();
            
        }
    },
    methods: {
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