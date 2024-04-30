<template>
     <checkboxComponent :id="id" :label="label" @is_checked="event_is_check"></checkboxComponent>
 </template>
<script>
import { dataStore } from '/src/Stores/dataStore.js';
import { generateLoremIpsumParagraph } from '/src/Utils/generate.js';
import checkboxComponent from '/src/js/Components/DataGenerators/Checkbox.vue';

export default {
    components: {
        checkboxComponent
    },   
    data() {
        return {
            name: 'lorenipsum',
            id: 'check_lorenipsum',
            label: 'Loren Ipsum',
            tags: [
                    // Em Português
                    'Obs',
                    'Observação',
                    'Descrição',
                    'Comentário',
                    'Comentários',
                    'Mensagem',
                    'Assunto',
                    'Título',
                    'Conteúdo',
                    // Em Inglês
                    'Note',
                    'Description',
                    'Name',
                    'Comment',
                    'Comments',
                    'Message',
                    'Content',
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

            /**
             * Emit event with the generated loren ipsum
             * when the button is clicked and the checkbox is checked
             * and the generate loren ipsum is ready
             */
            this.getLoremIpsumParagraph().then((lorenIpsum) => {
                this.$emit('event_data', lorenIpsum);
            }).catch((error) => {
                console.error(error);
            });
        },

        async getLoremIpsumParagraph() {
           
            const lorenIpsum =  await generateLoremIpsumParagraph();

                this.dataStore.add(
                    this.name,
                    lorenIpsum
                );

                return {
                    "field": this.name,
                    "tags": this.tags,
                    "value": lorenIpsum
                }
        }
    }
}
</script>