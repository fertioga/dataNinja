<template>
    <div class="form-check">
        <input class="form-check-input" v-model="is_check_cellphone_br" type="checkbox" value="" id="check_cellphone_br">
        <label class="form-check-label" for="check_cellphone_br">
            Cellphone (BR)
        </label>
    </div>
</template>
<script>
import { generatePhoneNumber } from '/src/Utils/generate.js';
import { dataStore } from '/src/Stores/dataStore.js';

export default {
    data() {
        return {
            name: 'cellphone_br',
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
            is_check_cellphone_br: false,
            dataStore: dataStore()
        }
    },
    props: ['eventBtClicked'], // eventBtClicked is a prop that receives a boolean value from the parent component
    watch: {
        eventBtClicked(data) {
            if (data === true && this.is_check_cellphone_br === true) // if the prop eventBtClicked is true and the checkbox is checked
                this.processEvent(); // call the method processEvent
            
        }
    },
    methods: {
        processEvent() {
            return this.$emit('event_cellphone_br', this.generatePhone()); 
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