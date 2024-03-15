<template>
    <div>
       <!-- System -->
        <div class="row">
            <div class="col">
                <hr>
                System:
            </div>
        </div>
        <!-- line -->
        <div class="row">
            <div class="col">
                <UUID_v1 :eventBtClicked="btClicked" @event_data="generate_data"></UUID_v1>
            </div>
            <div class="col">
                <UUID_v4 :eventBtClicked="btClicked" @event_data="generate_data"></UUID_v4>
            </div>
        </div>
        <!-- line -->
        <div class="row">
            <div class="col">
                <UUID_v7 :eventBtClicked="btClicked" @event_data="generate_data"></UUID_v7>
            </div>
            <div class="col">
                <UUID_ULID :eventBtClicked="btClicked" @event_data="generate_data"></UUID_ULID>
            </div>
        </div>
        <!-- line -->
        <div class="row">
            <div class="col">
                <LorenIpsum :eventBtClicked="btClicked" @event_data="generate_data"></LorenIpsum>
            </div>            
        </div>
    </div>    
</template>
<script>
/**
 * SystemGroup
 * Just a group of components to generate person data
 * recieves the event from the button and emits the data to the parent
 * recieves the event from the components and emits the data to the parent
 */
import LorenIpsum from './LorenIpsum.vue';
import UUID_v1 from './UUID_v1.vue';
import UUID_v4 from './UUID_v4.vue';
import UUID_v7 from './UUID_v7.vue';
import UUID_ULID from './UUID_ULID.vue';

export default {
    name: 'SystemGroup',
    components: {
        LorenIpsum,
        UUID_v1,
        UUID_v4,
        UUID_v7,
        UUID_ULID
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