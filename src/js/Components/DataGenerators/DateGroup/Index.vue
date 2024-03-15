<template>
    <div>
        <!-- DATE -->
        <div class="row">
            <div class="col">
                <hr>
                Date:
            </div>
        </div>
        <!-- line -->
        <div class="row">
            <div class="col">
                <DateBr :eventBtClicked="btClicked" @event_data="generate_data"></DateBr>
            </div>
            <div class="col">
                <DateUs :eventBtClicked="btClicked" @event_data="generate_data"></DateUs>
            </div>
        </div>
        <!-- line -->
        <div class="row">
            <div class="col">
                <DateDb :eventBtClicked="btClicked" @event_data="generate_data"></DateDb>
            </div>
            <div class="col">
                <DateTimestamp :eventBtClicked="btClicked" @event_data="generate_data"></DateTimestamp>
            </div>
        </div>
    </div>    
</template>
<script>
/**
 * DateGroup
 * Just a group of components to generate person data
 * recieves the event from the button and emits the data to the parent
 * recieves the event from the components and emits the data to the parent
 */
import DateBr from './DateBr.vue';
import DateUs from './DateUs.vue';
import DateDb from './DateDb.vue';
import DateTimestamp from './DateTimestamp.vue';

export default {
    name: 'DateGroup',
    components: {
        DateBr,
        DateUs,
        DateDb,
        DateTimestamp
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