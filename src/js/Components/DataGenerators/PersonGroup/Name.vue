<template>
    <checkboxComponent :id="id" :label="label" @is_checked="event_is_check"></checkboxComponent>
</template>
<script>
import { dataStore } from '/src/Stores/dataStore.js';
import { generateName, generateEmail } from '/src/Utils/generate.js';
import checkboxComponent from '/src/js/Components/DataGenerators/Checkbox.vue';

export default {
    components: {
        checkboxComponent
    },   
    data() {
        return {
            firstNames: [],
            lastNames: [],
            id: 'check_name',
            label: 'Name',
            tags: [
                    'name',
                    'nome',
                    'name',
                    'nome_completo',
                    'full_name',
                    'first_name',
                    'last_name',
                    'firstname',
                    'lastname',
                    'nome_usuario',
                    'usuario_nome',
                    'nome_completo_usuario',
                    'usuario_nome_completo',
                    'apelido',
                    'nickname',
                    'apelido_usuario',
                    'nickname_user'
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
             * and the generate name is ready
             */
            this.getName().then((result)=>{

                this.$emit('event_data', result);
            
            }).catch((error)=>{
            
                console.error('Error emit event loading names:', error);
            
            });

        },

        /**
         * Get the generated name from Utils/generate.js
         * and add it to the dataStore
         */
        async getName() {

            try {                

                // get the generated name from Utils/generate.js
                const completeName = await generateName();

                // add the name to the dataStore
                this.dataStore.add(
                    "name",
                    completeName
                );

                // add the email to the dataStore with the name as the email
                this.dataStore.add(
                    "email",
                    generateEmail(completeName)
                );

                return {
                        "field": "name",
                        "tags": this.tags,
                        "value": completeName
                    }
                    
            } catch (error) {
                console.error('Error loading names:', error);
            }
            
        }
    }
}
</script>