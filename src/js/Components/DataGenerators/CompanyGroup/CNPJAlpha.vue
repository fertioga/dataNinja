<template>
    <checkboxComponent :id="id" :label="label" @is_checked="event_is_check"></checkboxComponent>
</template>
<script>
import checkboxComponent from '/src/js/Components/DataGenerators/Checkbox.vue';
import { generateCnpjAlpha } from '/src/Utils/generate.js';

export default {
    components: {
        checkboxComponent
    },
    data() {
        return {
            name: 'cnpj_alpha',
            id: 'check_cnpj_alpha',
            label: 'CNPJ Alfa',
            tags: [
                'cnpj_alpha',
                'CNPJ Alpha',
                'cnpj_alfanumerico',
                'cnpj_alfa'
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
            this.$emit('event_data', {
                field: this.name,
                tags: this.tags,
                value: generateCnpjAlpha()
            });
        }
    }
}
</script>
