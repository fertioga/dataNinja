<template>
    <checkboxComponent :id="id" :label="label" @is_checked="event_is_check"></checkboxComponent>
</template>
<script>
import { dataStore } from '/src/Stores/dataStore.js';
import checkboxComponent from '/src/js/Components/DataGenerators/Checkbox.vue';

export default {
    components: {
        checkboxComponent
    },  
    data() {
        return {
            name: 'rg',
            id: 'check_rg',
            label: 'RG',
            tags: [
                // Português
                'rg',
                'identidade',
                'n_identidade',
                'numero_identidade',
                'documento_identidade',
                'identidade_pessoa',
                'identidade_cliente',
                'identidade_usuario',
                'identidade_pessoa',
                'identidade_cliente',
                'identidade_usuario',
                'identidade_fisico',
                'identidade_juridico',
                'identidade_individual',
                'identidade_fisico',
                'identidade_juridico',
                'identidade_individual',
                // Inglês
                'id',
                'identification',
                'id_number',
                'identity_document',
                'person_id',
                'client_id',
                'user_id',
                'person_id',
                'client_id',
                'user_id',
                'id_physical',
                'id_legal',
                'id_individual',
                'id_physical',
                'id_legal',
                'id_individual'
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

        processEvent() {
            return this.$emit('event_data', this.generateRG());
        },

        generateRG() {

            // Gera os números aleatórios para cada parte do RG
            const randomPart = () => {
                let part = '';
                for (let i = 0; i < 3; i++) {
                    part += Math.floor(Math.random() * 10); // Gera um dígito aleatório
                }
                return part;
            };

            const rgNumber = `${randomPart()}.${randomPart()}.${randomPart()}-${Math.floor(Math.random() * 10)}`;

            // add in the dataStore
            this.dataStore.add(
                    "rg",
                    rgNumber
                );

            return {
                "field": this.name,
                "tags": this.tags,
                "value": rgNumber
            }
        }
    }
}
</script>