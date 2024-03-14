<template>
    <div class="form-check">
        <input class="form-check-input" v-model="is_check_cnpj" type="checkbox" value="" id="check_cnpj">
        <label class="form-check-label" for="check_cnpj">
            CNPJ
        </label>
    </div>
</template>
<script>
export default {
    data() {
        return {
            name: 'cnpj',
            tags: [
                    'cnpj',
                    'txt_cnpj',
                    'CNPJ',
                    'cnpj_empresa',
                    'cnpj_cliente',
                    'cnpj_fornecedor',
                    'txt_cnpj_empresa',
                    'txt_cnpj_cliente',
                    'txt_cnpj_fornecedor',
                    'cnpj_social',
                    'cnpj_pessoal',
                    'cnpj_comercial',
                    'txt_cnpj_social',
                    'txt_cnpj_pessoal',
                    'txt_cnpj_comercial'
                    ],
            is_check_cnpj: false
        }
    },
    props: ['eventBtClicked'],
    watch: {

        eventBtClicked(data) {
            if (data === true && this.is_check_cnpj === true) 
                this.processEvent();            
        }
    },
    methods: {
        
        processEvent() {
            this.$emit('event_cnpj', this.generateCNPJ());
        },

        generateCNPJ() {

            let n = function() { return Math.floor(Math.random() * 9) }; // Gera um dígito aleatório de 0 a 9
            let n1 = n(), n2 = n(), n3 = n(), n4 = n(), n5 = n(), n6 = n(), n7 = n(), n8 = n(), n9 = 0, n10 = 0, n11 = 0, n12 = 1;
            let d1 = n12 * 2 + n11 * 3 + n10 * 4 + n9 * 5 + n8 * 6 + n7 * 7 + n6 * 8 + n5 * 9 + n4 * 2 + n3 * 3 + n2 * 4 + n1 * 5;
            d1 = 11 - (d1 % 11);
            if (d1 >= 10) d1 = 0;
            let d2 = d1 * 2 + n12 * 3 + n11 * 4 + n10 * 5 + n9 * 6 + n8 * 7 + n7 * 8 + n6 * 9 + n5 * 2 + n4 * 3 + n3 * 4 + n2 * 5 + n1 * 6;
            d2 = 11 - (d2 % 11);
            if (d2 >= 10) d2 = 0;

            return {
                "field": this.name,
                "tags": this.tags,
                "value": '' + n1 + n2 + '.' + n3 + n4 + n5 + '.' + n6 + n7 + n8 + '/' + n9 + n10 + n11 + n12 + '-' + d1 + d2,
            }
        }
    },
    
}
</script>