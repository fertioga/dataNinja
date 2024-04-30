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
            name: 'phone_br',
            id: 'check_phone_br',
            label: 'Phone (BR)',
            tags: [
            'phone',
            'telefone',
            'tel',
            'telephone',
            'fone',
            'phone_number',
            'telefone_numero',
            'num_telefone',
            'telephone_number',
            'tel_number',
            'num_telefone',
            'telefone_comercial',
            'commercial_phone',
            'tel_comercial',
            'business_phone',
            'business_tel',
            'telefone_residencial',
            'residential_phone',
            'tel_residencial',
            'home_phone',
            'home_tel',
            'residential_tel',
            'residential_telephone',
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

            const phone = generatePhoneNumber("phoneBr");

            // add in the dataStore
            this.dataStore.add(
                    "phone_br",
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