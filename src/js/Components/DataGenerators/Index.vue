  <template>
    <div class="container">

      <PersonGroup :eventBtClicked="btClicked" @event_data="generate_data"></PersonGroup>

      <IdentificationGroup :eventBtClicked="btClicked" @event_data="generate_data"></IdentificationGroup>
     
      <CompanyGroup :eventBtClicked="btClicked" @event_data="generate_data"></CompanyGroup>

      <FinancialGroup :eventBtClicked="btClicked" @event_data="generate_data"></FinancialGroup>

      <DateGroup :eventBtClicked="btClicked" @event_data="generate_data"></DateGroup>

      <SystemGroup :eventBtClicked="btClicked" @event_data="generate_data"></SystemGroup>
     
      <div class="row">
        <div class="col">
          <div id="content">
            <button type="button" class="btn btn-success" @click="btIsClicked">Generate Data</button>
          </div>
        </div>
      </div>
      <!--Result row-->
      <div class="row">
        <div class="col">
            <div class="card w-100">
              <div class="card-body">
                <div class="card-text" id="content_result">
                    <p v-if="result_data_generate.length > 0" v-for = "(result, index) in result_data_generate" :key="index" @click="copyIndividualContent(result, (result.field).concat(index))" style="cursor: pointer;">
                        
                        <font-awesome-icon icon="arrow-left" @click="searchAndWrite(result)" />
                        {{ result.field }}: 
                        {{ result.value }}

                        <font-awesome-icon icon="copy"  v-if="iconVisible!=(result.field).concat(index)" />
                        <font-awesome-icon class="success" icon="check" v-if="iconVisible==(result.field).concat(index)"  />

                    </p>
                  </div>                
              </div>
            </div>
        </div>
      </div>
      <!--Buttons row-->
      <div class="row">
        <div class="col">
          <div id="content">
            <button type="button" class="btn btn-primary btn-sm" @click="searchAndWhriteAll()">
              <font-awesome-icon icon="arrow-left"/> 
              Send All
            </button>
          </div>
        </div>
        <div class="col">
          <div id="content">
            <button type="button" class="btn btn-primary btn-sm" @click="copyAllContent()">
              Copy All
              <font-awesome-icon icon="copy"/>
            </button>
            <span v-if="content_copied" style="margin-left: 5px; color: green;">Copied!</span>
          </div>
        </div>
      </div>

    </div>
  </template>
  
  <script>
  import { dataStore } from '/src/Stores/dataStore.js';
  import PersonGroup from './PersonGroup/Index.vue';
  import IdentificationGroup from './IdentificationGroup/Index.vue';
  import FinancialGroup from './FinancialGroup/Index.vue';
  import CompanyGroup from './CompanyGroup/Index.vue';
  import DateGroup from './DateGroup/Index.vue';
  import SystemGroup from './SystemGroup/Index.vue';
 
  export default {
    components: {
      PersonGroup,
      IdentificationGroup,
      FinancialGroup,
      CompanyGroup,
      DateGroup,
      SystemGroup
    },
    name: 'DataGenerators',
    data() {
      return {
        btClicked: false,
        result_data_generate: [],
        iconVisible: null,
        content_copied: null,
        dataStore: dataStore()
      };
    },
    methods: {
      
      /**
       * Listen the event of the child component
       * and push the data to the array result_data_generate
       * @param {object} data
       */
      generate_data(data) {
          this.result_data_generate.push(data);
      },

      /**
       * Set the btClicked to true
       */
      btIsClicked() {

        // clear store
        this.dataStore.clear();

        // set the btClicked to true
        this.btClicked = true;

        // Reset the array
        this.result_data_generate = []; 

        // Set the btClicked to false after 1 second
        setTimeout(() => this.btClicked = false, 1000);

      },

      /**
       * Copy the content to clipboard
       * @param {string} result
       */
      copyIndividualContent(result, icon) {       

        navigator.clipboard.writeText(result.value); // Copy to clipboard                
        this.iconVisible = icon; // Feedback icon        
        setTimeout(() => { this.iconVisible = null }, 500); // Hide the icon

      },

      /**
       * Copy all content to clipboard
       */
      copyAllContent() {

        let content = '';
        this.result_data_generate.forEach((result) => {
          content += result.value + '\n';
        });
        navigator.clipboard.writeText(content); // Copy to clipboard
        this.content_copied = true; // Feedback message
        setTimeout(() => { this.content_copied = null }, 500); // Hide the message

      },

      /**
       * Search and write all fields in the file contentScript.js
       * to search the field and write the value in the web page
       */
      searchAndWhriteAll(){

        this.result_data_generate.forEach((result) => {
          this.searchAndWrite(result);
        });

      },

      /**
       * Search and write a field
       * use a API to search the field and write the value
       * in the file contentScript.js to search the field 
       * and write the value in the web page
       */
      searchAndWrite(parameter){
        
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {

          if (tabs && tabs.length > 0) {

            const tabId = tabs[0].id;

            /* Send a message to the content script */
            chrome.tabs.sendMessage(tabId, {action: "searchAndWriteField", parameter}, (response) => { 
              if (chrome.runtime.lastError) {
                console.log(chrome.runtime.lastError.message);
              } else if (!response) {
                alert("Was not possible to find the field. Please, try again.");
              }
            });

          } else {
            alert("Was not possible to find the field. Please, try again.");
          }
        });

      },


    }
  };
  </script>
  