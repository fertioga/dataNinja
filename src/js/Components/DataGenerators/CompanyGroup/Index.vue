<template>
    <div>
        <!-- COMPANY -->
        <div class="row">
            <div class="col">
                Company:
            </div>
        </div>
        <!-- line -->
        <div class="row">
            <div class="col">
                <Company :eventBtClicked="btClicked" @event_data="generate_data"></Company>
            </div>
            <div class="col">
                <CNPJ :eventBtClicked="btClicked" @event_data="generate_data"></CNPJ>
            </div>
        </div>
        <!-- line -->
        <div class="row">
            <div class="col">
                <Website :eventBtClicked="btClicked" @event_data="generate_data"></Website>
            </div>
        </div>
    </div>    
</template>
<script>
/**
 * CompanyGroup
 * Just a group of components to generate person data
 * recieves the event from the button and emits the data to the parent
 * recieves the event from the components and emits the data to the parent
 */
import CNPJ from './CNPJ.vue';
import Company from './Company.vue';
import Website from './Website.vue';

export default {
    name: 'CompanyGroup',
    components: {
        CNPJ,
        Company,
        Website
    },
    data() {
        return {
            btClicked: false // to control the button click
        }
    },
    props: ['eventBtClicked'], // recieves the event from the button
    watch: {
        eventBtClicked(trueFalse) { // watches the event from the button
            this.btClicked = trueFalse;         
        }
    },
    methods: {
        /**
         * Emits the data to the parent (DataGenerators/Index.vue)
         */
        generate_data(data) { 
            this.$emit('event_data', data);
        }
    }   
};
</script>