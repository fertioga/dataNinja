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
            name: 'cvv',
            id: 'is_check_credit_card_cvv',
            label: 'CVV',
            tags: [
                "codigo_seguranca",
                "CVV",
                "CVC",
                "CVC2",
                "CID",
                "CSC",
                "CCV",
                "SecurityCode",
                "VerificationCode",
                "CardVerificationValue",
                "CardVerificationCode",
                "CardSecurityCode",
                "CardValidationCode",
                "CardCode",
                "CardID",
                "CardVerification",
                "CardSecurity",
                "CardValidation",
                "SecurityNumber",
                "ValidationNumber"
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
            return this.$emit('event_data', this.generateCreditCardCvv());
        },

        generateCreditCardCvv() {

            // Gerar um número CVV de três dígitos aleatoriamente entre 100 e 999
            const cvv = Math.floor(Math.random() * 900) + 100;
            const  finalCvv = cvv.toString(); // Retorna o CVV como uma string

            // add in the dataStore
            this.dataStore.add(
                    "credit_card_cvv",
                    finalCvv
                );

            return {
                "field": this.name,
                "tags": this.tags,
                "value": finalCvv
            }
        }
    }
}
</script>