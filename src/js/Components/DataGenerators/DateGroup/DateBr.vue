<template>
    <div class="form-check">
        <input class="form-check-input" v-model="is_check_date_br" type="checkbox" value="" id="check_date_br">
        <label class="form-check-label" for="check_date_br">
            Date (BR)
        </label>
    </div>
</template>
<script>
import { dataStore } from '/src/Stores/dataStore.js';
import { generateDate } from '/src/Utils/generate.js';

export default {
    data() {
        return {
            name: 'date_br',
            tags: [
                    // Em português
                    'data_nascimento',
                    'data_contratacao',
                    'data_vencimento',
                    'data',
                    'data_compra',
                    'data_finalizacao',
                    'data_cadastro',
                    'data_alteracao',
                    // Em inglês
                    'birth_date',
                    'hiring_date',
                    'expiration_date',
                    'date',
                    'purchase_date',
                    'completion_date',
                    'registration_date',
                    'modification_date',
                    // Com prefixo "txt_" em português
                    'txt_data_nascimento',
                    'txt_data_contratacao',
                    'txt_data_vencimento',
                    'txt_data',
                    'txt_data_compra',
                    'txt_data_finalizacao',
                    'txt_data_cadastro',
                    'txt_data_alteracao',
                    // Com prefixo "txt_" em inglês
                    'txt_birth_date',
                    'txt_hiring_date',
                    'txt_expiration_date',
                    'txt_date',
                    'txt_purchase_date',
                    'txt_completion_date',
                    'txt_registration_date',
                    'txt_modification_date'
                    ],
            is_check_cpf: false,
            dataStore: dataStore()
        }
    },
    props: ['eventBtClicked'],
    watch: {
        eventBtClicked(data) {
            if (data === true && this.is_check_date_br === true) 
                this.processEvent();
            
        }
    },
    methods: {
        processEvent() {
            return this.$emit('event_data', this.generateDate("BR"));
        },

        generateDate(format) {
           
            const dataReturn = generateDate(format);

            // add in the dataStore
            this.dataStore.add(
                    "date_br",
                    dataReturn
                );

            return {
                "field": this.name,
                "tags": this.tags,
                "value": dataReturn
            }
        }
    }
}
</script>