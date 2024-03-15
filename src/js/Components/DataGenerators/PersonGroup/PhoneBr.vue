<template>
    <div class="form-check">
        <input class="form-check-input" v-model="is_check_phone_br" type="checkbox" value="" id="check_phone_br">
        <label class="form-check-label" for="check_phone_br">
            Phone (BR)
        </label>
    </div>
</template>
<script>
import { generatePhoneNumber } from '/src/Utils/generate.js';
import { dataStore } from '/src/Stores/dataStore.js';

export default {
    data() {
        return {
            name: 'phone_br',
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
            is_check_phone_br: false,
            dataStore: dataStore()
        }
    },
    props: ['eventBtClicked'], // eventBtClicked is a prop that receives a boolean value from the parent component
    watch: {
        eventBtClicked(data) {
            if (data === true && this.is_check_phone_br === true) // if the prop eventBtClicked is true and the checkbox is checked
                this.processEvent(); // call the method processEvent
            
        }
    },
    methods: {
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