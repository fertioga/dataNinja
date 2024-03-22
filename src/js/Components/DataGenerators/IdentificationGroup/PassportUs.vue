<template>
    <div class="form-check">
        <input class="form-check-input" v-model="is_check_passport_us" type="checkbox" value="" id="check_passport_us">
        <label class="form-check-label" for="check_passport_us">
            Passport (US)
        </label>
    </div>
</template>
<script>
import { dataStore } from '/src/Stores/dataStore.js';
export default {
    data() {
        return {
            name: 'passport_us',
            tags: [
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
            if (data === true && this.is_check_passport_us === true) 
                this.processEvent();
            
        }
    },
    methods: {
        processEvent() {
            return this.$emit('event_data', this.generatePassport("US"));
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
                    "passport_us",
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