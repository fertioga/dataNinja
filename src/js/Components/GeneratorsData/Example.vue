<template>
    <div class="form-check">
        <input class="form-check-input" v-model="is_check_XXXXX" type="checkbox" value="" id="check_XXXXX">
        <label class="form-check-label" for="check_XXXXX">
            XXXXX
        </label>
    </div>
</template>
<script>
export default {
    data() {
        return {
            name: 'XXXXX',
            tags: ['XXXXX', 'XXXXX', 'XXXXX', 'XXXXX', 'XXXXX', 'XXXXX', 'XXXXX'], // replace the tags with the correct values. This is used to search in the website to find the correct generator
            is_check_XXXXX: false
        }
    },
    props: ['eventBtClicked'], // eventBtClicked is a prop that receives a boolean value from the parent component
    watch: {
        eventBtClicked(data) {
            if (data === true && this.is_check_XXXXX === true) // if the prop eventBtClicked is true and the checkbox is checked
                this.processEvent(); // call the method processEvent
            
        }
    },
    methods: {
        processEvent() {
            return this.$emit('event_XXXXXX', this.generateXXXXX()); // emit the event_XXXXXX to the parent component with the value returned from the method generateXXXXX
        },

        generateXXXXX() {
            return {
                "field": this.name, // return the field name "XXXXX
                "value": 'Some value', // return the value to be emitted
                "tags": this.tags // return the tags to be used in the search
            }
        }
    }
}
</script>