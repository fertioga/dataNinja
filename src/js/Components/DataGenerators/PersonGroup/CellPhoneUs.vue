<template>
    <div class="form-check">
        <input class="form-check-input" v-model="is_check_cellphone_us" type="checkbox" value="" id="check_cellphone_us">
        <label class="form-check-label" for="check_cellphone_us">
            Cellphone (US)
        </label>
    </div>
</template>
<script>
import { generatePhoneNumber } from '/src/Utils/generate.js';
import { dataStore } from '/src/Stores/dataStore.js';

export default {
    data() {
        return {
            name: 'cellphone_us',
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
            is_check_cellphone_us: false,
            dataStore: dataStore()
        }
    },
    props: ['eventBtClicked'], // eventBtClicked is a prop that receives a boolean value from the parent component
    watch: {
        eventBtClicked(data) {
            if (data === true && this.is_check_cellphone_us === true) // if the prop eventBtClicked is true and the checkbox is checked
                this.processEvent(); // call the method processEvent
            
        }
    },
    methods: {
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