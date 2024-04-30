<template>
    <div>
        <!-- PERSON -->
        <div class="row">
            <div class="col">
                Person:         
            </div>
        </div>
        <!-- line  -->
        <div class="row">
            <div class="col">
                <Name :eventBtClicked="btClicked" @event_data="generate_data"></Name>
            </div>
            <div class="col">
                <PhoneBr :eventBtClicked="btClicked" @event_data="generate_data"></PhoneBr>
            </div>     
        </div>
        <!-- line  -->
        <div class="row">
            <div class="col">
                <CellPhoneBr :eventBtClicked="btClicked" @event_data="generate_data"></CellPhoneBr>
            </div>
            <div class="col">
                <CellPhoneUs :eventBtClicked="btClicked" @event_data="generate_data"></CellPhoneUs>
            </div>
        </div>
        <!-- line  -->
        <div class="row">
            <div class="col">
                <PhoneUs :eventBtClicked="btClicked" @event_data="generate_data"></PhoneUs>
            </div>  
            <div class="col">
                <Email :eventBtClicked="btClicked" @event_data="generate_data"></Email>
            </div>
        </div>
        <!-- line  -->
        <div class="row">
            <div class="col">
                <Password :eventBtClicked="btClicked" @event_data="generate_data"></Password>
            </div>
        </div>
    </div>    
</template>
<script>
/**
 * PersonGroup
 * Just a group of components to generate person data
 * recieves the event from the button and emits the data to the parent
 * recieves the event from the components and emits the data to the parent
 */
import Name from './Name.vue';
import PhoneBr from './PhoneBr.vue';
import CellPhoneBr from './CellPhoneBr.vue';
import CellPhoneUs from './CellPhoneUs.vue';
import PhoneUs from './PhoneUs.vue';
import Email from './Email.vue';
import Password from './Password.vue';

export default {
    name: 'PersonGroup',
    components: {
        Name,
        PhoneBr,
        CellPhoneBr,
        CellPhoneUs,
        PhoneUs,
        Email,
        Password
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