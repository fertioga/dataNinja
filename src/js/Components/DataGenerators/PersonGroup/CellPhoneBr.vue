<template>
    <checkboxComponent :id="id" :label="label" @is_checked="event_is_check"></checkboxComponent>
</template>
<script>
import { generatePhoneNumber } from '/src/Utils/generate.js';
import { dataStore } from '/src/Stores/dataStore.js';
import checkboxComponent from '/src/js/Components/DataGenerators/Checkbox.vue';

export default {
    components: {
        checkboxComponent
    },   
    data() {
        return {
            name: 'cellphone_br',
            id: 'check_cellphone_br',
            label: 'Cellphone (BR)',
            tags: [
            'cellphone',
            'celular',
            'telefone_celular',
            'cel',
            'mobile',
            'cel_phone',
            'celular_telefone',
            'numero_celular',
            'telefone_cel',
            'cell',
            'telefone_mob',
            'celular_numero',
            'numero_telefone_celular',
            'celular_number',
            'num_celular'
            ],
            is_checked: false,
            dataStore: dataStore()
        }
    },
    props: ['eventBtClicked'], // eventBtClicked is a prop that receives a boolean value from the parent component
    watch: {
        eventBtClicked(data) {
            if (data === true && this.is_checked === true) // if the prop eventBtClicked is true and the checkbox is checked
                this.processEvent(); // call the method processEvent
            
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
            return this.$emit('event_data', this.generatePhone()); 
        },

        generatePhone() {

            const phone = generatePhoneNumber("cellphoneBr");

            // add in the dataStore
            this.dataStore.add(
                    "cellphone_br",
                    phone
                );

            return {
                "field": this.name, 
                "value": phone, 
                "tags": this.tags 
            }
        }
    }
}
</script>