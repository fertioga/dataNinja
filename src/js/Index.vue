<template>
  <div id="container">
      <!-- Div de sobreposição para aparecer durante o carregamento -->
      <div v-if="dataStore.getLoading()" class="overlay">
        <div> <img src="images/loading.gif"></div>
      </div>

      <div class="accordion" id="accordionMain">
        <!-- data datagenerator -->
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#dataGenerator" aria-expanded="true" aria-controls="dataGenerator">
              Generate Fake Data
            </button>
          </h2>
              <div id="dataGenerator" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionMain">
                  <div class="accordion-body">
                    <DataGenerators> </DataGenerators>
                  </div>
              </div>
        </div>

        <!-- item imagegenerator -->
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#fakeImage" aria-expanded="false" aria-controls="fakeImage">
              Generate Fake Image
            </button>
          </h2>
          <div id="fakeImage" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionMain">
            <div class="accordion-body">
              <ImageGenerators> </ImageGenerators>
            </div>
          </div>
        </div>      

        <!-- JSON Formatter -->
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#jsonFormatter" aria-expanded="false" aria-controls="jsonFormatter">
              JSON Formatter
            </button>
          </h2>
          <div id="jsonFormatter" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionMain">
            <div class="accordion-body">
              <JsonFormatter> </JsonFormatter>
            </div>
          </div>
        </div>   

        <!-- Encode Decode  -->
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#encodeDecode" aria-expanded="false" aria-controls="encodeDecode">
              Encode/Decode
            </button>
          </h2>
          <div id="encodeDecode" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionMain">
            <div class="accordion-body">
              <EncodeDecode></EncodeDecode>
            </div>
          </div>
        </div>   

        <!-- Color Picker  -->
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#colorPicker" aria-expanded="false" aria-controls="colorPicker">
              Color Picker
            </button>
          </h2>
          <div id="colorPicker" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionMain">
            <div class="accordion-body">
              <ColorPicker></ColorPicker>
            </div>
          </div>
        </div>   

        <!-- Ascii  -->
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#ascii" aria-expanded="false" aria-controls="ascii">
              ASCII Table
            </button>
          </h2>
          <div id="ascii" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionMain">
            <div class="accordion-body">
              <Ascii></Ascii>
            </div>
          </div>
        </div>  

        <!-- Regex  -->
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#regex" aria-expanded="false" aria-controls="regex">
              Regex Builder
            </button>
          </h2>
          <div id="regex" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionMain">
            <div class="accordion-body">
              <Regex></Regex> 
            </div>
          </div>
        </div>  

        <!-- About  -->
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#about" aria-expanded="false" aria-controls="about">
              @About
            </button>
          </h2>
          <div id="about" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionMain">
            <div class="accordion-body">
              <About></About>  
            </div>
          </div>
        </div>  

      </div>
      <!-- Footer -->
      <div class="fixed-bottom">
              
      </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { dataStore } from '/src/Stores/dataStore.js';
import DataGenerators from './Components/DataGenerators/Index.vue';
import ImageGenerators from './Components/ImageGenerators/Index.vue';
import JsonFormatter from './Components/JsonFormatter/Index.vue';
import ColorPicker from './Components/ColorPicker/Index.vue';
import Ascii from './Components/Ascii/Index.vue';
import Regex from './Components/Regex/Index.vue';
import EncodeDecode from './Components/EncodeDecode/Index.vue';
import About from './Components/About/Index.vue';

export default {
  name: 'Data Ninja',

  components: {
    DataGenerators,
    ImageGenerators,
    JsonFormatter,
    ColorPicker,
    Ascii,
    Regex,
    EncodeDecode,
    About
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
  .accordion {
    --bs-accordion-border-color: none;
  }

  body, .accordion-item {
    background: #282A36 !important;
    color: #f8f8f2 !important;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }

  .accordion-header {
    box-shadow: #fff 0px 0px 4px 0px !important;
  }

  .accordion-body {
    padding: 16px 4px !important;
  }

  .accordion-button {
    background: #44475a !important;
    color: #f8f8f2 !important;
  }

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

  .fixed-bottom {
    background-color: #fff;
    border-radius: 15px; 
  }
</style>