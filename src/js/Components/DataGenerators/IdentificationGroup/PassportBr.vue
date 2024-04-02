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
            name: 'passport_br',
            id: 'check_passport_br',
            label: 'Passport (BR)',
            tags: [
                    // Português
                    'passaporte',
                    'n_passaporte',
                    'numero_passaporte',
                    'passaporte_numero',
                    'doc_passaporte',
                    'passaporte_documento',
                    'passaporte_pessoa',
                    'passaporte_pessoa',
                    'numero_passaporte',
                    'documento_passaporte',
                    'passaporte_cliente',
                    'passaporte_usuario',
                    'passaporte_cliente',
                    'passaporte_usuario',
                    'passaporte_fisico',
                    'passaporte_juridico',
                    'passaporte_individual',
                    'passaporte_fisico',
                    'passaporte_juridico',
                    'passaporte_individual',
                    // Inglês
                    'passport',
                    'passport_number',
                    'n_passport',
                    'doc_passport',
                    'passport_doc',
                    'passport_person',
                    'passport_client',
                    'passport_user',
                    'passport_person',
                    'passport_client',
                    'passport_user',
                    'passport_physical',
                    'passport_legal',
                    'passport_individual',
                    'passport_physical',
                    'passport_legal',
                    'passport_individual'
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
            return this.$emit('event_data', this.generatePassport("BR"));
        },

        generatePassport(countryCode) {

            const prefix = countryCode.toUpperCase(); 
            const length = 9; 
            const numericLength = 6;

            let passportNumber = prefix;

            for (let i = 0; i < numericLength; i++) {
                passportNumber += Math.floor(Math.random() * 10);
            }

            for (let i = prefix.length + numericLength; i < length; i++) {
                passportNumber += String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Gera uma letra maiúscula aleatória
            }
            
            // add in the dataStore
            this.dataStore.add(
                    "passport_br",
                    passportNumber
                );

            return {
                "field": this.name,
                "tags": this.tags,
                "value": passportNumber
            }
        }
    }
}
</script>