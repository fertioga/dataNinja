<template>
    <div>
      <textarea v-model="regex"></textarea>
      <textarea v-model="testString"></textarea>
      <button @click="testRegex">Testar Expressão Regular</button>
      <div v-if="testResult !== null">
        <h3>Resultado:</h3>
        <pre>{{ testResult }}</pre>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        regex: '',
        testString: '',
        testResult: null
      };
    },
    methods: {
      testRegex() {
        try {
          const regex = new RegExp(this.regex);
          this.testResult = regex.test(this.testString);
        } catch (error) {
          this.testResult = 'Erro: Expressão regular inválida';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  textarea {
    width: 100%;
    height: 100px;
  }
  </style>
  