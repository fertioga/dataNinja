<template>
    <checkboxComponent :id="id" :label="label" @is_checked="event_is_check"></checkboxComponent>
</template>
<script>
import { dataStore } from '/src/Stores/dataStore.js';
import checkboxComponent from '/src/js/Components/DataGenerators/Checkbox.vue';

export default {
    components: {
        checkboxComponent
    },  
    data() {
        return {
            name: 'ssn',
            id: 'check_ssn',
            label: 'SSN',
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