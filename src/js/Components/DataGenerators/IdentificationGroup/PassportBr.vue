<template>
    <div class="form-check">
        <input class="form-check-input" v-model="is_check_passport_br" type="checkbox" value="" id="check_passport_br">
        <label class="form-check-label" for="check_passport_br">
            Passport (BR)
        </label>
    </div>
</template>
<script>
import { dataStore } from '/src/Stores/dataStore.js';
export default {
    data() {
        return {
            name: 'passport_br',
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
            is_check_cpf: false,
            dataStore: dataStore()
        }
    },
    props: ['eventBtClicked'],
    watch: {
        eventBtClicked(data) {
            if (data === true && this.is_check_passport_br === true) 
                this.processEvent();
            
        }
    },
    methods: {
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