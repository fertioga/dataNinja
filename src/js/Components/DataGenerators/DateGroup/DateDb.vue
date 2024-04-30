<template>
    <checkboxComponent :id="id" :label="label" @is_checked="event_is_check"></checkboxComponent>
</template>
<script>
import { dataStore } from '/src/Stores/dataStore.js';
import { generateDate } from '/src/Utils/generate.js';
import checkboxComponent from '/src/js/Components/DataGenerators/Checkbox.vue';

export default {
    components: {
        checkboxComponent
    },  
    data() {
        return {
            name: 'date_db',
            id: 'check_date_db',
            label: 'Date (DB)',
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