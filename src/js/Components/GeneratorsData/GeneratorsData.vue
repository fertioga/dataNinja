  <template>
    <div class="container">

      <!-- PERSON -->
      <div class="row">
        <div class="col">
          Person:          
        </div>
      </div>
      <!-- line  -->
      <div class="row">
        <div class="col">
          <Name :eventBtClicked="btClicked" @event_name="generate_data"></Name>
        </div>
        <div class="col">
          <PhoneBr :eventBtClicked="btClicked" @event_phone_br="generate_data"></PhoneBr>
        </div>     
      </div>
      <!-- line  -->
      <div class="row">
        <div class="col">
          <CellPhoneBr :eventBtClicked="btClicked" @event_cellphone_br="generate_data"></CellPhoneBr>
        </div>
        <div class="col">
          <CellPhoneUs :eventBtClicked="btClicked" @event_cellphone_us="generate_data"></CellPhoneUs>
        </div>
      </div>
      <!-- line  -->
      <div class="row">
        <div class="col">
          <PhoneUs :eventBtClicked="btClicked" @event_phone_us="generate_data"></PhoneUs>
        </div>  
        <div class="col">
          <Email :eventBtClicked="btClicked" @event_email="generate_data"></Email>
        </div>
      </div>

      <!-- IDENTIFICATION -->
      <div class="row">
        <div class="col">
          <hr>
          Identification:
        </div>
      </div>
      <!-- line  -->
      <div class="row">       
       <div class="col">
         <CPF :eventBtClicked="btClicked" @event_cpf="generate_data"></CPF>
       </div>   
       <div class="col">
          <SSN :eventBtClicked="btClicked" @event_ssn="generate_data"></SSN>
        </div>     
      </div>
      <!-- line  -->
      <div class="row">
        <div class="col">
          <PassportBr :eventBtClicked="btClicked" @event_passport_br="generate_data"></PassportBr>
        </div>
        <div class="col">
          <PassportUs :eventBtClicked="btClicked" @event_passport_us="generate_data"></PassportUs>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <CNH :eventBtClicked="btClicked" @event_cnh="generate_data"></CNH>
        </div>
        <div class="col">
          <RG :eventBtClicked="btClicked" @event_rg="generate_data"></RG>
        </div>
      </div>
     
      <!-- COMPANY -->
      <div class="row">
        <div class="col">
          <hr>
          Company:
        </div>
      </div>
      <!-- line -->
      <div class="row">
        <div class="col">
          <Company :eventBtClicked="btClicked" @event_company="generate_data"></Company>
        </div>
        <div class="col">
          <CNPJ :eventBtClicked="btClicked" @event_cnpj="generate_data"></CNPJ>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <Website :eventBtClicked="btClicked" @event_website="generate_data"></Website>
        </div>
      </div>

      <!-- FINANCIAL -->
      <div class="row">
        <div class="col">
          <hr>
          Financial:
        </div>
      </div>
      <!-- line -->
      <div class="row">
        <div class="col">
          <CreditCard :eventBtClicked="btClicked" @event_credit_card="generate_data"></CreditCard>
        </div>
        <div class="col">
          <CreditCardValidateDate :eventBtClicked="btClicked" @event_credit_card_validate_date="generate_data"></CreditCardValidateDate>
        </div>
      </div>
      <!-- line -->
      <div class="row">
        <div class="col">
          <CreditCardCvv :eventBtClicked="btClicked" @event_credit_card_cvv="generate_data"></CreditCardCvv>
        </div>
      </div>

      <!-- DATE -->
      <div class="row">
        <div class="col">
          <hr>
          Date:
        </div>
      </div>
      <!-- line -->
      <div class="row">
        <div class="col">
          <DateBr :eventBtClicked="btClicked" @event_date_br="generate_data"></DateBr>
        </div>
        <div class="col">
          <DateUs :eventBtClicked="btClicked" @event_date_us="generate_data"></DateUs>
        </div>
      </div>
     
      <div class="row">
        <div class="col">
          <div id="content">
            <button type="button" class="btn btn-success" @click="btIsClicked">Generate Data</button>
          </div>
        </div>
      </div>

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
  import CPF from './CPF.vue';
  import CNPJ from './CNPJ.vue';
  import Email from './Email.vue';
  import Name from './Name.vue';
  import Company from './Company.vue';
  import CellPhoneBr from './CellPhoneBr.vue';
  import PhoneBr from './PhoneBr.vue';
  import CellPhoneUs from './CellPhoneUs.vue';
  import PhoneUs from './PhoneUs.vue';
  import SSN from './SSN.vue';
  import PassportBr from './PassportBr.vue';
  import PassportUs from './PassportUs.vue';
  import CNH from './CNH.vue';
  import RG from './RG.vue';
  import CreditCard from './CreditCard.vue';
  import CreditCardValidateDate from './CreditCardValidateDate.vue';
  import CreditCardCvv from './CreditCardCvv.vue';
  import Website from './Website.vue';
  import DateBr from './DateBr.vue';
  import DateUs from './DateUs.vue';

  export default {
    components: {
      CPF,
      CNPJ,
      Email,
      Name,
      Company,
      CellPhoneBr,
      PhoneBr,
      CellPhoneUs,
      PhoneUs,
      SSN,
      PassportBr,
      PassportUs,
      CNH,
      RG,
      CreditCard,
      CreditCardValidateDate,
      CreditCardCvv,
      Website,
      DateBr,
      DateUs
    },
    name: 'GeneratorsData',
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
  