<template>
    <div>
        <!-- FINANCIAL -->
        <div class="row">
            <div class="col">
            <hr>
            Financial:
            </div>
        </div>
        <!-- line -->
        <div class="row">
            <div class="col">
                <CreditCard :eventBtClicked="btClicked" @event_data="generate_data"></CreditCard>
            </div>
            <div class="col">
                <CreditCardValidateDate :eventBtClicked="btClicked" @event_data="generate_data"></CreditCardValidateDate>
            </div>
        </div>
        <!-- line -->
        <div class="row">
            <div class="col">
                <CreditCardCvv :eventBtClicked="btClicked" @event_data="generate_data"></CreditCardCvv>
            </div>
        </div>
    </div>    
</template>
<script>
/**
 * FinancialGroup
 * Just a group of components to generate person data
 * recieves the event from the button and emits the data to the parent
 * recieves the event from the components and emits the data to the parent
 */
import CreditCard from './CreditCard.vue';
import CreditCardValidateDate from './CreditCardValidateDate.vue';
import CreditCardCvv from './CreditCardCvv.vue';

export default {
    name: 'FinancialGroup',
    components: {
        CreditCard,
        CreditCardValidateDate,
        CreditCardCvv
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