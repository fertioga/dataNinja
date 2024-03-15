<template>
    <div class="form-check">
        <input class="form-check-input" v-model="is_check_credit_card_cvv" type="checkbox" value="" id="is_check_credit_card_cvv">
        <label class="form-check-label" for="is_check_credit_card_cvv">
            CVV
        </label>
    </div>
</template>
<script>
import { dataStore } from '/src/Stores/dataStore.js';
export default {
    data() {
        return {
            name: 'cvv',
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
            is_check_cpf: false,
            dataStore: dataStore()
        }
    },
    props: ['eventBtClicked'],
    watch: {
        eventBtClicked(data) {
            if (data === true && this.is_check_credit_card_cvv === true) 
                this.processEvent();
            
        }
    },
    methods: {
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