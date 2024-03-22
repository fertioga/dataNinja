<template>
    <div class="form-check">
        <input class="form-check-input" v-model="is_check_lorenipsum" type="checkbox" value="" id="check_lorenipsum">
        <label class="form-check-label" for="check_lorenipsum">
            Loren Ipsum
        </label>
    </div>
</template>
<script>
import { dataStore } from '/src/Stores/dataStore.js';
import { generateLoremIpsumParagraph } from '/src/Utils/generate.js';

export default {
    data() {
        return {
            name: 'lorenipsum',
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
            is_check_cpf: false,
            dataStore: dataStore()
        }
    },
    props: ['eventBtClicked'],
    watch: {
        eventBtClicked(data) {
            if (data === true && this.is_check_lorenipsum === true) 
                this.processEvent();
            
        }
    },
    methods: {
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