<template>
    <div class="form-check">
        <input class="form-check-input" v-model="is_check_rg" type="checkbox" value="" id="check_rg">
        <label class="form-check-label" for="check_rg">
            RG
        </label>
    </div>
</template>
<script>
import { dataStore } from '/src/Stores/dataStore.js';
export default {
    data() {
        return {
            name: 'rg',
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
            is_check_cpf: false,
            dataStore: dataStore()
        }
    },
    props: ['eventBtClicked'],
    watch: {
        eventBtClicked(data) {
            if (data === true && this.is_check_rg === true) 
                this.processEvent();
            
        }
    },
    methods: {
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