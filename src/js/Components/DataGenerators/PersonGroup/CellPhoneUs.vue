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
            name: 'cellphone_us',
            id: 'check_cellphone_us',
            label: 'Cellphone (US)',
            tags: [
            'cellphone',
            'mobile_phone',
            'cellular_phone',
            'mobile',
            'cell_phone',
            'cell_number',
            'cell_num',
            'mobile_number',
            'phone_mobile',
            'phone_cell',
            'mobile_telephone',
            'cellular_telephone',
            'cellular_number',
            'mobile_num',
            'mobile_phone_number',
            'cellular_phone_number',
            'cellular_num',
            'cellular_telephone_number',
            'mobile_telephone_number',
            'cellular_phone_num',
            'cellular_phone_telephone',
            'mobile_phone_telephone',
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

            const phone = generatePhoneNumber("cellphoneUs");

            // add in the dataStore
            this.dataStore.add(
                    "cellphone_us",
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