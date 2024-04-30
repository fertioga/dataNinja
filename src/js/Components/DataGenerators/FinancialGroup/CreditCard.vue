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
            name: 'credit_card',
            id: 'check_credit_card',
            label: 'Credit Card',
            tags: [
                    // Português
                    'cc',
                    'cc_numero',
                    'numero_cc',
                    'cc_cliente',
                    'cc_usuario',
                    'cc_cliente',
                    'cc_usuario',
                    'cc_cliente_numero',
                    'cc_usuario_numero',
                    'cc_cliente_numero',
                    'cc_usuario_numero',
                    // Inglês
                    'cc_number',
                    'number_cc',
                    'client_cc',
                    'user_cc',
                    'client_cc',
                    'user_cc',
                    'client_cc_number',
                    'user_cc_number',
                    'card_number',
                    'ccnumber'
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
            return this.$emit('event_data', this.generateCreditCard());
        },

        generateCreditCard() {

            // Prefixo Mastercard varia entre 51 e 55
            const prefix = '5' + Math.floor(Math.random() * 5 + 1); // Gera um número entre 51 e 55

            // Gera o corpo do número de cartão, preenchido com dígitos aleatórios
            let ccNumber = prefix;
            for (let i = 0; i < 14; i++) {
                ccNumber += Math.floor(Math.random() * 10); // Gera um dígito aleatório
            }

            // Calcula a soma dos dígitos, multiplicando cada segundo dígito por 2
            let sum = 0;
            let doubleUp = false;
            for (let i = ccNumber.length - 1; i >= 0; i--) {
                let digit = parseInt(ccNumber.charAt(i));

                if (doubleUp) {
                    digit *= 2;
                    if (digit > 9) {
                        digit -= 9;
                    }
                }

                sum += digit;
                doubleUp = !doubleUp;
            }

            // Verifica se a soma é um múltiplo de 10
            if (sum % 10 !== 0) {
                // Se não for, ajusta o último dígito para torná-lo válido
                const checkDigit = (Math.floor(sum / 10) + 1) * 10 - sum;
                ccNumber += checkDigit;
            }

            const creditCard = ccNumber;

            // add in the dataStore
            this.dataStore.add(
                    "credit_card",
                    creditCard
                );

            return {
                "field": this.name,
                "tags": this.tags,
                "value": creditCard
            }
        }
    }
}
</script>