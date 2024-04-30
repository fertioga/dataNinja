<template>
    <checkboxComponent :id="id" :label="label" @is_checked="event_is_check"></checkboxComponent>
</template>
<script>
import { dataStore } from '/src/Stores/dataStore.js';
import { generateCompany } from '/src/Utils/generate.js';
import checkboxComponent from '/src/js/Components/DataGenerators/Checkbox.vue';

export default {
    components: {
        checkboxComponent
    },   
    data() {
        return {
            name: 'website',
            id: 'check_website',
            label: 'Website',
            tags: [
                "Website",
                "Site",
                "URL",
                "WebAddress",
                "Web",
                "Homepage",
                "Webpage",
                "Address",
                "Link",
                "WebLink",
                "SiteLink",
                "WebsiteLink",
                "Home",
                "WebsiteURL",
                "SiteURL",
                "HomepageURL",
                "WebpageURL",
                "WebAddressURL"
                ],
            is_checked: false,
            dataStore: dataStore()
        }
    },
    props: ['eventBtClicked'],
    watch: {
        eventBtClicked(data) {
            if (data === true && this.is_checked === true) 
                this.processEvent();            
        }
    },
    methods: {

        /**
         * Process event is check
         * @param {bool} value 
         */
         event_is_check(value) {
            this.is_checked = value;
        },
        
        async processEvent() {

            /**
             * Emit event with the generated name
             * when the button is clicked and the checkbox is checked 
             * and the generate Website is ready
             */
            this.getWebsite().then((result)=>{

                this.$emit('event_data', result);
            
            }).catch((error)=>{
            
                console.error('Error emit event loading website:', error);
            
            });
        },

        /**
         * Get the generated Website from Utils/generate.js
         * and add it to the dataStore
         */
        async getWebsite() {

            try {         
                
                const result = await new Promise(resolve => {

                    // Simulate a delay to mount the name and email in store    
                    setTimeout(() => {

                        //first verify if the name is in store  
                        if (this.dataStore.keyExists('company')) {

                            const company = this.dataStore.getByKey('company')[0].value;   

                            resolve({
                                "field": this.name,
                                "tags": this.tags,
                                "value": this.generateWebsiteByCompany(company)
                            });
                            
                        } else {
                            
                            // get the generated name from Utils/generate.js
                            generateCompany().then((company) => {
                                resolve({
                                    "field": this.name,
                                    "tags": this.tags,
                                    "value": this.generateWebsiteByCompany(company)
                                });
                            }).catch((error) => {
                                console.error('Error get website:', error);
                            });                            
                        }
                    }, 500);
                    });

                return result;
                    
            } catch (error) {
                console.error('Error loading website:', error);
            }
            
        },

        /**
         * Generate a Website
         * @param {string} company
         */
        generateWebsiteByCompany(company) {

            return company
                        .replace(/[^a-zA-Z]/g, '')
                        .replace(/'/g, '')
                        .toLowerCase()
                        .concat('.com');
        }
    }
}
</script>