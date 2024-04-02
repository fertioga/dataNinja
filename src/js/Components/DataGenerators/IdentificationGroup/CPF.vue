<template>
    <checkboxComponent :id="id" :label="label" @is_checked="event_is_check"></checkboxComponent>
</template>
<script>
import checkboxComponent from '/src/js/Components/DataGenerators/Checkbox.vue';

export default {
    components: {
        checkboxComponent
    },  
    data() {
        return {
            name: 'cpf',
            id: 'check_cpf',
            label: 'CPF',
            tags: [
                    'cpf',
                    'CPF',
                    'cpf',
                    'cpf_pessoa',
                    'cpf_cliente',
                    'cpf_usuario',
                    'cpf_pessoa',
                    'cpf_cliente',
                    'cpf_usuario',
                    'cpf_fisico',
                    'cpf_juridico',
                    'cpf_individual',
                    'cpf_fisico',
                    'cpf_juridico',
                    'cpf_individual'
                    ],
            is_checked: false
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
            return this.$emit('event_data', this.generateCPF());
        },

        generateCPF() {
            let n = 9;
            let n1 = Math.floor(Math.random() * n);
            let n2 = Math.floor(Math.random() * n);
            let n3 = Math.floor(Math.random() * n);
            let n4 = Math.floor(Math.random() * n);
            let n5 = Math.floor(Math.random() * n);
            let n6 = Math.floor(Math.random() * n);
            let n7 = Math.floor(Math.random() * n);
            let n8 = Math.floor(Math.random() * n);
            let n9 = Math.floor(Math.random() * n);
            let d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;
            d1 = 11 - (d1 % 11);
            if (d1 >= 10) d1 = 0;
            let d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
            d2 = 11 - (d2 % 11);
            if (d2 >= 10) d2 = 0;

            return {
                "field": this.name,
                "tags": this.tags,
                "value": '' + n1 + n2 + n3 + '.' + n4 + n5 + n6 + '.' + n7 + n8 + n9 + '-' + d1 + d2,
            }
        }
    }
}
</script>