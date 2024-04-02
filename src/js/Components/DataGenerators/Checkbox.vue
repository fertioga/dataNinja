<template>
    <div class="form-check">
        <input class="form-check-input" v-model="is_checked" type="checkbox" :id="ck_id" value="">
        <label class="form-check-label" :for="ck_id">
            {{ ck_label }}
        </label>
    </div>
</template>

<script>
import { checkboxStore } from '/src/Stores/checkboxStore.js';
export default {

    data() {
        return {
                name: 'checkboxComponent',
                checkboxStore: checkboxStore(),
                is_checked: false,
                ck_id: null,
                ck_label: null,
            }
        },
    props: ['id','label'],
    watch: {

        /**
         * Verify when variable is change to 
         * set Store and emit a event with new status (true/false)
         */
        is_checked() {
            
            if (this.is_checked === true) {
                this.checkboxStore.add(this.ck_id);
            } else {
                this.checkboxStore.delete(this.ck_id);
            }

            this.$emit('is_checked', this.is_checked); 
        },

        // Watcher to checkboxes store
        'checkboxStore.checkboxes': {
            immediate: true, // Execute the handler immediately
            handler(newCheckboxes) {
                // Verify if this checkbox is checked in newCheckboxes
                this.is_checked = this.checkboxStore.isCheckedById(this.ck_id);
            }
        }
    },
    mounted() {
        this.ck_id = this.id
        this.ck_label = this.label
        this.is_checked = this.checkboxStore.isCheckedById(this.ck_id)
    },
}
</script>