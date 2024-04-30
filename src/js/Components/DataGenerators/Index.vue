  <template>
    <div class="container" data-bs-theme="dark">
      <div class="row">
        <div class="col-md-6" style="width: auto;">
          <div class="form-check form-switch">
            <input class="form-check-input" v-model="clock_renew" type="checkbox" id="ck_clock_renew" value="">
            <label class="form-check-label" for="ck_clock_renew"> 
                renew 
                <span v-if="clock_renew">in: {{ qt_sec_renew }} sec.</span></label>
          </div>          
        </div>

        <div class="col-md-6" @click="cleanCheckbox()" style="cursor: pointer; width: auto;">
          <font-awesome-icon icon="minus-square" title="Clean"  style="cursor: pointer;" />  clean
        </div>
      </div>

        <hr>
        <PersonGroup :eventBtClicked="btClicked" @event_data="generate_data"></PersonGroup>
        <hr>
        <IdentificationGroup :eventBtClicked="btClicked" @event_data="generate_data"></IdentificationGroup>
        <hr>
        <CompanyGroup :eventBtClicked="btClicked" @event_data="generate_data"></CompanyGroup>
        <hr>
        <FinancialGroup :eventBtClicked="btClicked" @event_data="generate_data"></FinancialGroup>
        <hr>
        <DateGroup :eventBtClicked="btClicked" @event_data="generate_data"></DateGroup>
        <hr>
        <SystemGroup :eventBtClicked="btClicked" @event_data="generate_data"></SystemGroup>
     
      <div class="row">
        <div class="col">
          <div id="content" class="d-grid gap-2">
            <hr>
              <button type="button" class="btn btn-info" @click="btIsClicked">Generate Data</button>
            <hr>
          </div>
        </div>
      </div>

      <!--Buttons Send and Copy All row-->
      <div class="row" v-if="result_data_generate.length > 0">
        <div class="col" style="width: 100%;">

          <div id="content">
            <div @click="searchAndWhriteAll()" class="icon-send-all" style="cursor: pointer;" title="Send All to the Page">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
              </svg>
              send all 
            </div>
          </div>

        </div>
        <div class="col">

          <div id="content" style="cursor: pointer;" class="icon-copy-all"  title="Copy All" @click="copyAllContent()" >
            copy all  
            <font-awesome-icon icon="copy" />           
            <span v-if="content_copied" style="margin-left: 5px; color: green;">copied!</span>
          </div>

        </div>
      </div>

      <!--Result row-->
      <div class="row">
        <div class="col col-result" id="content_result">            
            <p v-if="result_data_generate.length > 0" class="class-p-line position-relative" v-for = "(result, index) in result_data_generate" :key="index" :id="result.field" @click="copyIndividualContent(result, result.field)" style="cursor: pointer;">
                
                <div class="icon-wrapper" @click="searchAndWrite(result, result.field)" title="Send to the Page">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left icon-arrow-send" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"/>
                    <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
                  </svg>
                </div>

                <span class="floating-label">{{ result.field }}:</span>

                <p class="p-result">{{ result.value }}</p>

                <div class="icon-copy-check-container">
                  <font-awesome-icon icon="copy"  title="Copy"  v-if="(iconVisible != result.field && content_copied == false)" />
                  <font-awesome-icon icon="check" v-if="(iconVisible == result.field || content_copied)" />
                </div>
            </p>
            <hr>
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
  import { checkboxStore } from '/src/Stores/checkboxStore.js';

  const TIME_RENEW_DATA = 30;

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
        qt_sec_renew: null,
        clock_renew: false,
        dataStore: dataStore(),
        checkboxStore: checkboxStore()
      };
    },
    watch: {
      clock_renew: function (ck_is_selected) {      
        this.renewClock(ck_is_selected);
      }
    },
    methods: {
     
      /**
       * Renew the clock
       */
      renewClock(ck_is_selected) {
  
          if (ck_is_selected) {
            this.qt_sec_renew = TIME_RENEW_DATA;

            this.interval = setInterval(() => {
              this.qt_sec_renew--;

              // if the time is over, click the button
              if (this.qt_sec_renew == 0) {
                this.btIsClicked();
                this.qt_sec_renew = TIME_RENEW_DATA;
              }

            }, 1000);

          } else {
            clearInterval(this.interval);
            this.qt_sec_renew = null;
          }
    
      },

      /**
       * Set the btClicked to true
       */
      btIsClicked() {

        // Scroll to the result
        $('html, body').animate({scrollTop: $('#content_result').offset().top}, 'slow');
        
        // set Loading true
        this.dataStore.setLoadingDuring(1500);

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
       * Clean all checkbox from localStore
       */
      cleanCheckbox(){
        this.checkboxStore.clear();
      },

      /**
       * Listen the event of the child component after button clicked
       * and push the result of process to the array result_data_generate
       * @param {object} data
       */
       generate_data(data) {
          // push the result to the array
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

            setTimeout(() => { elements.classList.remove('not-found'); }, 4000);
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

  .collapsed, .accordion-button:focus {
    box-shadow: none !important;
  }

  .p-result {
    font-size: 1rem;
    overflow: hidden;
    margin-bottom: 0;
  }

  .floating-label {
    position: absolute;
    top: -15px; 
    left: 10px; 
    padding: 0 5px;
    color: #8DB9DC;
    background: #282A36;
    z-index: 1;
  }

  .icon-copy-all {
    color: #74A8A3;
    font-size: 1rem;
    font-weight: bold;
    float: right;
  }
  
  .icon-copy-check-container {
    position: absolute;
    top: 8px;
    right: 8px;
    color: #74A8A3;
  }

  .class-p-line{
    margin-bottom: 14px;
    padding: 10px;
    width: 100%;
    border: 2px solid #6272A4;
  }

  .found{
    color: #74A8A3;
  }
  
  .not-found{
    color: #dc3545;
  }

  .icon-send-all {
    color: #74A8A3;
    font-size: 1rem;
    font-weight: bold;
    margin-left: -12px;
  }

  .icon-arrow-send {
      padding: 0;
      align-self: top; 
      float: left;
      margin-right: 10px; 
      position: absolute;
      top: 10px;
      color: #74A8A3;
      background: #282A36;
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
    padding: 30px 8px;
    background: #282A36 !important;    
    color: #f8f8f2 !important;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }

  .btn-info {
    color: #282A36;
    font-weight: bold;
  }
</style>