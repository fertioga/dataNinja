<template>
    <div>
      <div class="row">
        <div class="col-md-6">
          <ModalExamplesRegex></ModalExamplesRegex>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6">
          <label>Regex Builder</label>
          <textarea :class="'form-control ' + animation" v-model="regex" id="textarea_regex" placeholder="Regex Builder"></textarea>
        </div>
        <div class="col-md-6">
          <label>Test String</label>
          <textarea :class="'form-control ' + animation" v-model="testString" id="textarea_test" placeholder="Put your String here to test"></textarea>
        </div>
      </div>
     
      <div class="row">
        <div class="col-md-6">
          <button class="btn btn-info" @click="testRegex">Test</button>
        </div>       
      </div> 
      
      <div class="row" v-if="testResult !== null">
        <div v-if="testResult" :class="typeTestResult" role="alert">
          <h4>Result:</h4>
          <pre>{{ testResult }}</pre>
        </div>        
      </div>

    </div>
  </template>
  
  <script>
  import ModalExamplesRegex from './ModalExamplesRegex.vue';
  export default {
    components: {
      ModalExamplesRegex
    },
    data() {
      return {
        regex: '^...$',
        testString: '',
        testResult: null,
        typeTestResult: '',
        animation: ''
      };
    },
    methods: {


      /**
       * @param {string} character 
       */
      addCharacter(character) {
        this.regex += character;
      },

      /**
       * Test if the regex match with the testString
       */
      testRegex() {
        try {
          const regex = new RegExp(this.regex);
          this.testResult = regex.test(this.testString);

          if(this.testResult){

            this.testResult = 'Match';
            this.typeTestResult = 'alert alert-success';
            this.animationWhenTrue();

          } else {

            this.testResult = 'No Match';
            this.typeTestResult = 'alert alert-danger';
            this.animationWhenFalse();
          }

        } catch (error) {
          this.animationWhenFalse();
          this.testResult = 'Erro: Invalid Regex';
        }
      },

      /**
       * Animation when the test is true
       */
      animationWhenTrue(){
        this.animation = 'animate__animated animate__pulse';

        document.getElementById('textarea_regex').style.borderColor = '#7ED321'; 
        document.getElementById('textarea_test').style.borderColor = '#7ED321';  
    
        setTimeout(() => {
          this.animation = '';
          document.getElementById('textarea_regex').style.borderColor = ''; 
          document.getElementById('textarea_test').style.borderColor = '';
        }, 2000);

      },

      /**
       * Animation when the test is false
       */
      animationWhenFalse(){

        document.getElementById('textarea_regex').style.borderColor = '#FF5B00'; 
        document.getElementById('textarea_test').style.borderColor = '#FF5B00';  

        this.animation = 'animate__animated animate__tada';
    
        setTimeout(() => {
          this.animation = '';
          document.getElementById('textarea_regex').style.borderColor = ''; 
          document.getElementById('textarea_test').style.borderColor = '';
        }, 2000);

      },  
    },

  };
  </script>
  
  <style scoped>
  textarea {
    width: 100%;
    height: 100px;
  }
  button {
    margin-right: 5px;
  }
  </style>
  