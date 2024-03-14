<template>
    <div class="form-check">
        <input class="form-check-input" v-model="is_check_phone_us" type="checkbox" value="" id="check_phone_us">
        <label class="form-check-label" for="check_phone_us">
            Phone (US)
        </label>
    </div>
</template>
<script>
import { generatePhoneNumber } from '/src/Utils/generate.js';
import { dataStore } from '/src/Stores/dataStore.js';

export default {
    data() {
        return {
            name: 'phone_us',
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
            is_check_phone_us: false,
            dataStore: dataStore()
        }
    },
    props: ['eventBtClicked'], // eventBtClicked is a prop that receives a boolean value from the parent component
    watch: {
        eventBtClicked(data) {
            if (data === true && this.is_check_phone_us === true) // if the prop eventBtClicked is true and the checkbox is checked
                this.processEvent(); // call the method processEvent
            
        }
    },
    methods: {
        processEvent() {
            return this.$emit('event_phone_us', this.generatePhone()); 
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