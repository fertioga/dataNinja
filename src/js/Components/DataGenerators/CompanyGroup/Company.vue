<template>
    <checkboxComponent :id="id" :label="label" @is_checked="event_is_check"></checkboxComponent>
</template>
<script>
import { dataStore } from '/src/Stores/dataStore.js';
import { generateCompany } from '/src/Utils/generate.js';
import checkboxComponent from '/src/js/Components/DataGenerators/Checkbox.vue';

export default {
    components: {
        checkboxComponent
    },   
    data() {
        return {
            name: 'company',
            id: 'check_company',
            label: 'Name',
            tags: [
                    'company',
                    'empresa',
                    'txt_company',
                    'nome_empresa',
                    'enterprise_name',
                    'nome_fantasia',
                    'fantasy_name',
                    'razao_social',
                    'social_name',
                    'nome_companhia',
                    'companhia_nome',
                    'company_name',
                    'companhia',
                    'enterprise',
                    'razao_social',
                    'social_reason',
                    'social'
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
        
        async processEvent() {

            /**
             * Emit event with the generated name
             * when the button is clicked and the checkbox is checked 
             * and the generate company is ready
             */
            this.getCompany().then((result)=>{

                this.$emit('event_data', result);
            
            }).catch((error)=>{
            
                console.error('Error emit event loading companies:', error);
            
            });

        },

        /**
         * Get the generated company from Utils/generate.js
         * and add it to the dataStore
         */
        async getCompany() {

            try {                

                // get the generated name from Utils/generate.js
                const company = await generateCompany();

                // add the company to the dataStore
                this.dataStore.add(
                    this.name,
                    company
                );

                return {
                        "field": this.name,
                        "tags": this.tags,
                        "value": company
                    }
                    
            } catch (error) {
                console.error('Error loading companies:', error);
            }
            
        }
    }
}
</script>