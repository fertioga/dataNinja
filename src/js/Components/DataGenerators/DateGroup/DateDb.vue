<template>
    <div class="form-check">
        <input class="form-check-input" v-model="is_check_date_db" type="checkbox" value="" id="check_date_db">
        <label class="form-check-label" for="check_date_db">
            Date (DB)
        </label>
    </div>
</template>
<script>
import { dataStore } from '/src/Stores/dataStore.js';
import { generateDate } from '/src/Utils/generate.js';

export default {
    data() {
        return {
            name: 'date_db',
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
                    'data_nascimento',
                    'data_contratacao',
                    'data_vencimento',
                    'data',
                    'data_compra',
                    'data_finalizacao',
                    'data_cadastro',
                    'data_alteracao',
                    // Com prefixo "" em inglês
                    'birth_date',
                    'hiring_date',
                    'expiration_date',
                    'date',
                    'purchase_date',
                    'completion_date',
                    'registration_date',
                    'modification_date'
                    ],
            is_check_cpf: false,
            dataStore: dataStore()
        }
    },
    props: ['eventBtClicked'],
    watch: {
        eventBtClicked(data) {
            if (data === true && this.is_check_date_db === true) 
                this.processEvent();
            
        }
    },
    methods: {
        processEvent() {
            return this.$emit('event_data', this.generateDate("DB"));
        },

        generateDate(format) {
           
            const dataReturn = generateDate(format);

            // add in the dataStore
            this.dataStore.add(
                    "date_db",
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