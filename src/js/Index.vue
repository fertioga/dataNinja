<template>
  <div>
      <!-- Div de sobreposição para aparecer durante o carregamento -->
      <div v-if="dataStore.getLoading()" class="overlay">
        <div> <img src="images/loading.gif"></div>
      </div>

      <div class="accordion" id="accordionExample">
        <!-- item datagenerator -->
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Generate Fake Data
            </button>
          </h2>
              <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    <DataGenerators> </DataGenerators>
                  </div>
              </div>
        </div>

        <!-- item imagegenerator -->
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Generate Fake Image
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <ImageGenerators> </ImageGenerators>
            </div>
          </div>
        </div>      
      </div>

  </div>
</template>

<script>
import { ref } from 'vue';
import { dataStore } from '/src/Stores/dataStore.js';
import DataGenerators from './Components/DataGenerators/Index.vue';
import ImageGenerators from './Components/ImageGenerators/Index.vue';

export default {
  name: 'Data Ninja',

  components: {
    DataGenerators,
    ImageGenerators
  },
  data() {
    return {
      dataStore: dataStore(), 
    };
  },
  mounted() {
    //
  }
};
</script>
<style>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Cor de fundo com opacidade */
    z-index: 999; /* Coloca o elemento acima de todos os outros conteúdos */
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>