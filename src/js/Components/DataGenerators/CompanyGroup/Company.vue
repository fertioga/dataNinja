<template>
    <div class="form-check">
        <input class="form-check-input" v-model="is_check_company" type="checkbox" value="" id="check_company">
        <label class="form-check-label" for="check_company">
            Name
        </label>
    </div>
</template>
<script>
import { dataStore } from '/src/Stores/dataStore.js';
import { generateCompany } from '/src/Utils/generate.js';

export default {
    data() {
        return {
            name: 'company',
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
                    ],
            is_check_company: false,
            dataStore: dataStore()
        }
    },
    props: ['eventBtClicked'],
    watch: {
        eventBtClicked(data) {
            if (data === true && this.is_check_company === true) 
                this.processEvent();            
        }
    },
    methods: {
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