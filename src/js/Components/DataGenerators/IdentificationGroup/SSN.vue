<template>
    <div class="form-check">
        <input class="form-check-input" v-model="is_check_ssn" type="checkbox" value="" id="check_ssn">
        <label class="form-check-label" for="check_ssn">
            SSN
        </label>
    </div>
</template>
<script>
import { dataStore } from '/src/Stores/dataStore.js';
export default {
    data() {
        return {
            name: 'ssn',
            tags: [
                    'cpf',
                    'CPF',
                    'cpf',
                    'cpf_pessoa',
                    'cpf_cliente',
                    'cpf_usuario',
                    'cpf_pessoa',
                    'cpf_cliente',
                    'cpf_usuario',
                    'cpf_fisico',
                    'cpf_juridico',
                    'cpf_individual',
                    'cpf_fisico',
                    'cpf_juridico',
                    'cpf_individual'
                    ],
            is_check_cpf: false,
            dataStore: dataStore()
        }
    },
    props: ['eventBtClicked'],
    watch: {
        eventBtClicked(data) {
            if (data === true && this.is_check_ssn === true) 
                this.processEvent();
            
        }
    },
    methods: {
        processEvent() {
            return this.$emit('event_data', this.generateSSN());
        },

        generateSSN() {
            const randomDigit = () => Math.floor(Math.random() * 10); 
   
            const ssnDigits = Array.from({ length: 9 }, (_, i) => {
                if (i === 3 || i === 5) return '-';
                return randomDigit();
            });

            const ssn = ssnDigits.join('');

            // add in the dataStore
            this.dataStore.add(
                    "ssn",
                    ssn
                );

            return {
                "field": this.name,
                "tags": this.tags,
                "value": ssn
            }
        }
    }
}
</script>