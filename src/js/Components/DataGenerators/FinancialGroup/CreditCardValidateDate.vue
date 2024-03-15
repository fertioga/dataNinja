<template>
    <div class="form-check">
        <input class="form-check-input" v-model="is_check_credit_card_validate_date" type="checkbox" value="" id="is_check_credit_card_validate_date">
        <label class="form-check-label" for="is_check_credit_card_validate_date">
            Validate
        </label>
    </div>
</template>
<script>
import { dataStore } from '/src/Stores/dataStore.js';
export default {
    data() {
        return {
            name: 'cc_validate',
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
            is_check_cpf: false,
            dataStore: dataStore()
        }
    },
    props: ['eventBtClicked'],
    watch: {
        eventBtClicked(data) {
            if (data === true && this.is_check_credit_card_validate_date === true) 
                this.processEvent();
            
        }
    },
    methods: {
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