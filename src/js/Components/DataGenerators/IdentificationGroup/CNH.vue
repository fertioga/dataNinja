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
            name: 'cnh',
            id: 'check_cnh',
            label: 'CNH',
            tags: [
                'cnh',
                'carteira_de_habilitacao',
                'n_cnh',
                'numero_cnh',
                'documento_cnh',
                'cnh_pessoa',
                'cnh_cliente',
                'cnh_usuario',
                'cnh_pessoa',
                'cnh_cliente',
                'cnh_usuario',
                'cnh_fisico',
                'cnh_juridico',
                'cnh_individual',
                'cnh_fisico',
                'cnh_juridico',
                'cnh_individual',
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
            return this.$emit('event_data', this.generateCNH());
        },

        generateCNH() {

            // Função para calcular o dígito verificador da CNH
            function DV_CNH(cCNH) {
                let nM1 = 9;
                let nM2 = 1;
                let nDV1 = 0;
                let nDV2 = 0;
                let lMaior = false;

                for (let nI = 0; nI < 9; nI++) {
                    let nVL = parseInt(cCNH.charAt(nI));
                    nDV1 += (nVL * nM1);
                    nDV2 += (nVL * nM2);
                    nM1--;
                    nM2++;
                }

                nDV1 = nDV1 % 11;
                if (nDV1 > 9) {
                    nDV1 = 0;
                    lMaior = true;
                }

                nDV2 = nDV2 % 11;
                if (lMaior) {
                    if (nDV2 - 2 < 0) {
                        nDV2 += 9;
                    } else if (nDV2 - 2 >= 0) {
                        nDV2 -= 2;
                    }
                }

                if (nDV2 > 9) {
                    nDV2 = 0;
                }

                return String.fromCharCode(48 + nDV1) + String.fromCharCode(48 + nDV2);
            }

            let cnhNumber = '';
            for (let i = 0; i < 9; i++) {
                cnhNumber += Math.floor(Math.random() * 10); // Gera um dígito aleatório
            }

            const dv = DV_CNH(cnhNumber); // Calcula os dígitos verificadores

            const cnh = cnhNumber + dv;

            // add in the dataStore
            this.dataStore.add(
                    "cnh",
                    cnh
                );

            return {
                "field": this.name,
                "tags": this.tags,
                "value": cnh
            }
        }
    }
}
</script>