<template>
    <div class="form-check">
        <input class="form-check-input" v-model="is_check_date_timestamp" type="checkbox" value="" id="check_date_timestamp">
        <label class="form-check-label" for="check_date_timestamp">
            Timestamp
        </label>
    </div>
</template>
<script>
import { dataStore } from '/src/Stores/dataStore.js';
import { generateDate } from '/src/Utils/generate.js';

export default {
    data() {
        return {
            name: 'date_timestamp',
            tags: [
                     // Inglês
                    'timestamp',
                    'time',
                    'date',
                    'datetime',
                    'timestamp_field',
                    'timestamp_value',
                    'timestamp_data',
                    'created_at',
                    'updated_at',
                    'time_created',
                    'time_updated',
                    'record_date',
                    'entry_time',
                    'modification_time',
                    'last_modified',
                    'event_time',
                    'timestamp_entry',
                    'timestamp_update',
                    'timestamp_created',
                    'timestamp_modified',
                    // Português
                    'timestamp',
                    'horario',
                    'data',
                    'data_hora',
                    'campo_timestamp',
                    'valor_timestamp',
                    'dados_timestamp',
                    'criado_em',
                    'atualizado_em',
                    'hora_criacao',
                    'hora_atualizacao',
                    'data_registro',
                    'horario_entrada',
                    'horario_modificacao',
                    'ultima_modificacao',
                    'horario_evento',
                    'entrada_timestamp',
                    'atualizacao_timestamp',
                    'criacao_timestamp',
                    'modificacao_timestamp'
                    ],
            is_check_cpf: false,
            dataStore: dataStore()
        }
    },
    props: ['eventBtClicked'],
    watch: {
        eventBtClicked(data) {
            if (data === true && this.is_check_date_timestamp === true) 
                this.processEvent();
            
        }
    },
    methods: {
        processEvent() {
            return this.$emit('event_data', this.generateDate("TIMESTAMP"));
        },

        generateDate(format) {
           
            const dataReturn = generateDate(format);

            // add in the dataStore
            this.dataStore.add(
                    "date_timestamp",
                    dataReturn
                );

            return {
                "field": this.name,
                "tags": this.tags,
                "value": dataReturn
            }
        }
    }
}
</script>