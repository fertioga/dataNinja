<template>
    <div class="color-picker">
        <Sketch v-model="colors"></Sketch>
    </div>
</template>

<script>
import { Sketch } from '@ckpack/vue-color';

export default {
    name: 'ColorPicker',

    components: {
        Sketch,
    },

    data() {
        return {
            colors: '#fafafa'
        }
    }
}
</script>
<style>
.color-picker {
  display: flex;
  justify-content: center; 
  align-items: center; 
}
</style>

