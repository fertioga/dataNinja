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
            name: 'cc_validate',
            id: 'is_check_credit_card_validate_date',
            label: 'Validate',
            tags: [
                "data_validade",
                "ExpirationDate",
                "ExpDate",
                "Validade",
                "DataValidade",
                "ValidThru",
                "ValThru",
                "Vencimento",
                "DataVencimento",
                "ExpireDate",
                "ExpiryDate",
                "DateExpiration",
                "DateExpiry",
                "Expiration",
                "ExpiraEm",
                "Validez",
                "DataValidez",
                "VencimentoCartao",
                "DataVencimentoCartao"
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
            return this.$emit('event_data', this.generateCreditCardValidateDate());
        },

        generateCreditCardValidateDate() {

            // Obter o proximo ano
            const nextYear = new Date().getFullYear() +1;

            // Gerar um ano aleatório entre o ano atual e os próximos 10 anos
            const randomYear = nextYear + Math.floor(Math.random() * 11);

            // Gerar um mês aleatório entre 1 e 12
            const randomMonth = Math.floor(Math.random() * 12) + 1;

            // Formatando o mês para ter dois dígitos (ex: 01, 02, ..., 12)
            const formattedMonth = String(randomMonth).padStart(2, '0');

            // Retornar a data de validade no formato mm/yy
            const dataCard = `${formattedMonth}/${String(randomYear).slice(-2)}`;

            // add in the dataStore
            this.dataStore.add(
                    "credit_card_validate_date",
                    dataCard
                );

            return {
                "field": this.name,
                "tags": this.tags,
                "value": dataCard
            }
        }
    }
}
</script>