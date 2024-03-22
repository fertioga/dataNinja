  <template>
    <div class="container animate__animated animate__fadeInLeft">

      <PersonGroup :eventBtClicked="btClicked" @event_data="generate_data"></PersonGroup>

      <IdentificationGroup :eventBtClicked="btClicked" @event_data="generate_data"></IdentificationGroup>
     
      <CompanyGroup :eventBtClicked="btClicked" @event_data="generate_data"></CompanyGroup>

      <FinancialGroup :eventBtClicked="btClicked" @event_data="generate_data"></FinancialGroup>

      <DateGroup :eventBtClicked="btClicked" @event_data="generate_data"></DateGroup>

      <SystemGroup :eventBtClicked="btClicked" @event_data="generate_data"></SystemGroup>
     
      <div class="row">
        <div class="col">
          <div id="content" class="position-center">
            <button type="button" class="btn btn-success" @click="btIsClicked">Generate Data</button>
            <hr>
          </div>
        </div>
      </div>

      <!--Result row-->
      <div class="row">
        <div class="col col-result">            
            <p v-if="result_data_generate.length > 0" class="class-p-line position-relative" v-for = "(result, index) in result_data_generate" :key="index" :id="result.field" @click="copyIndividualContent(result, result.field)" style="cursor: pointer;">
                
                <div class="icon-wrapper" @click="searchAndWrite(result, result.field)" title="Send to the Page">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left icon-arrow-send" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                    <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                  </svg>
                </div>

                <span class="floating-label">{{ result.field }}:</span>

                <span class="span-result">{{ result.value }}</span>

                <div class="icon-copy-check-container">
                  <font-awesome-icon icon="copy"  title="Copy"  v-if="(iconVisible != result.field && content_copied == false)" />
                  <font-awesome-icon icon="check" v-if="(iconVisible == result.field || content_copied)" />
                </div>
            </p>
            <hr>
        </div>
      </div>

      <!--Buttons row-->
      <div class="row">
        <div class="col">

          <div id="content">
            <div @click="searchAndWhriteAll()" style="cursor: pointer;" title="Send All to the Page">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
              </svg>
              Send All
            </div>
          </div>

        </div>
        <div class="col">

          <div id="content" style="cursor: pointer;" title="Copy All" @click="copyAllContent()" >
            Copy All 
            <font-awesome-icon icon="copy" />           
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
        content_copied: false,
        dataStore: dataStore(),
      };
    },
    methods: {
     
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
       * Listen the event of the child component after button clicked
       * and push the result of process to the array result_data_generate
       * @param {object} data
       */
       generate_data(data) {
          this.result_data_generate.push(data);
      },

      //======================= COPY CONTENT ========================//
      /**
       * Copy the content to clipboard
       * @param {string} result
       */
      copyIndividualContent(result, icon) {       

        navigator.clipboard.writeText(result.value); // Copy to clipboard                
        
        this.animationWhenCopy(icon);
      },

      /**
       * Copy all content to clipboard
       */
      copyAllContent() {

        let content = '';
        this.result_data_generate.forEach((result) => {
          content += result.value + '\n';

          this.animationWhenCopy()
        });

        navigator.clipboard.writeText(content); // Copy to clipboard
        this.content_copied = true; // Feedback message
        setTimeout(() => { this.content_copied = false }, 500); // Hide the message

      },
      
      //======================= SEARCH AND WRITE ========================//
      /**
       * Search and write all fields in the file contentScript.js
       * to search the field and write the value in the web page
       */
      searchAndWhriteAll(){

        this.result_data_generate.forEach((result) => {
          this.searchAndWrite(result, result.field);
        });

      },

      /**
       * Search and write a field
       * use a API to search the field and write the value
       * in the file contentScript.js to search the field 
       * and write the value in the web page
       */
      searchAndWrite(parameter, p_field = null){

        // Set the field to animate 
        this.aninmationSend(p_field);

        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {

          if (tabs && tabs.length > 0) {

            const tabId = tabs[0].id;

            /* Send a message to the content script */
            chrome.tabs.sendMessage(tabId, {action: "searchAndWriteField", parameter}, (response) => { 
              
              if (response && response.success === true) {
                this.aninmationWhenFoundField(p_field);             
              } else {             
                this.aninmationWhenNotFoundField(p_field);
              }

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

      //======================= ANIMATIONS ===========================//    
      /**
       * Put an animation in the field that was copied
       * @param {string} p_field
       */
      animationWhenCopy(p_field=null){

        if (p_field != null) { // Individual copy

          this.iconVisible = p_field;
          setTimeout(() => { this.iconVisible = null; }, 1000);

        } else { // Copy all

          this.content_copied = true;
          setTimeout(() => { this.content_copied = false; }, 1000);

        }         
      },
    
    /**
     * Put an animation in the field that was sent
     * @param {string} p_field
     */
      aninmationSend(p_field){

        let elements = null;

        if (p_field != null) {

          elements = document.getElementById(p_field);       
          elements.classList.add('animate__animated', 'animate__bounceOutLeft'); 
          setTimeout(() => { elements.classList.remove('animate__animated', 'animate__bounceOutLeft'); }, 1000);

        }
      },

      /**
       * 
       * @param {string} p_field 
       */
      aninmationWhenFoundField(p_field){

        let elements = null;

        if (p_field != null) {
        
          setTimeout(() => { 
            elements = document.getElementById(p_field);  
            elements.classList.remove('not-found')     
            elements.classList.add('found'); 
          }, 1500);

        }
      },  

      /**
       * 
       * @param {string} p_field 
       */
      aninmationWhenNotFoundField(p_field){

        let elements = null;

        if (p_field != null) {
        
          setTimeout(() => { 
            elements = document.getElementById(p_field);       
            elements.classList.remove('found')  
            elements.classList.add('not-found','animate__animated', 'animate__shakeX'); 
            setTimeout(() => { elements.classList.remove('animate__animated', 'animate__shakeX'); }, 3000);
          }, 1500);

        }
      },
    },
  };
  </script>
  <style>
  .position-relative {
    position: relative;
  }

  .span-result {
    font-size: 1rem;
  }

  .floating-label {
    position: absolute;
    top: -15px; /* Ajuste conforme necessário */
    left: 10px; /* Ajuste conforme necessário */
    background-color: white;
    padding: 0 5px;
    z-index: 1;
  }

  .icon-copy-check-container {
    position: absolute;
    top: 0;
    right: 0;
  }

  .class-p-line{
    margin-bottom: 14px;
    padding: 10px;
    width: 100%;
    border: 1px solid #3333;
  }

  .found{
    color: green;
  }
  
  .not-found{
    color: red;
  }

  .icon-arrow-send {
      padding: 0;
      align-self: top; 
      float: left;
      margin-right: 10px; /* Adicione margem direita conforme necessário */
      position: absolute;
      top: 10px;
  }

  .icon-wrapper {
      display: flex;
      align-items: center; 
      margin-right: 10px;
      margin-left: -20px; 
      justify-content: flex-start; 
      margin-top: auto; 
      margin-bottom: auto;
  }

  .col-result {
    padding: 30px 0 0 0
  }
</style>