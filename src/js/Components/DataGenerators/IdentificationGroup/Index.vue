<template>
    <div>
        <!-- IDENTIFICATION -->
        <div class="row">
            <div class="col">
            Identification:
            </div>
        </div>
        <!-- line  -->
        <div class="row">       
            <div class="col">
                <CPF :eventBtClicked="btClicked" @event_data="generate_data"></CPF>
            </div>   
            <div class="col">
                <SSN :eventBtClicked="btClicked" @event_data="generate_data"></SSN>
            </div>     
        </div>
        <!-- line  -->
        <div class="row">
            <div class="col">
                <PassportBr :eventBtClicked="btClicked" @event_data="generate_data"></PassportBr>
            </div>
            <div class="col">
                <PassportUs :eventBtClicked="btClicked" @event_data="generate_data"></PassportUs>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <CNH :eventBtClicked="btClicked" @event_data="generate_data"></CNH>
            </div>
            <div class="col">
                <RG :eventBtClicked="btClicked" @event_data="generate_data"></RG>
            </div>
        </div>
    </div>    
</template>
<script>
/**
 * IndentificationGroup
 * Just a group of components to generate person data
 * recieves the event from the button and emits the data to the parent
 * recieves the event from the components and emits the data to the parent
 */
import CNH from './CNH.vue';
import CPF from './CPF.vue';
import PassportBr from './PassportBr.vue';
import PassportUs from './PassportUs.vue';
import RG from './RG.vue';
import SSN from './SSN.vue';

export default {
    name: 'IdentificationGroup',
    components: {
        CNH,
        CPF,
        PassportBr,
        PassportUs,
        RG,
        SSN
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