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
            name: 'phone_us',
            id: 'check_phone_us',
            label: 'Phone (US)',
            tags: [
            'phone',
            'telephone',
            'telephony',
            'landline',
            'home_phone',
            'house_phone',
            'work_phone',
            'office_phone',
            'business_phone',
            'business_line',
            'desk_phone',
            'contact_phone',
            'line',
            'wireless',
            'office_line',
            'work_line',
            'main_line',
            'primary_line',
            'secondary_line',
            'home_line',
            'house_line',
            'landline_phone',
            'landline_telephone',
            'landline_number',
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

            const phone = generatePhoneNumber("phoneUs");

            // add in the dataStore
            this.dataStore.add(
                    "phone_us",
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