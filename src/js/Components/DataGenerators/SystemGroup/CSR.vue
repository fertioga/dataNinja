<template>
    <checkboxComponent :id="id" :label="label" @is_checked="event_is_check"></checkboxComponent>
</template>
<script>
import checkboxComponent from '/src/js/Components/DataGenerators/Checkbox.vue';
import forge from 'node-forge';

export default {
    components: {
        checkboxComponent
    },    
    data() {
        return {
            name: 'csr',
            id: 'check_csr',
            label: 'CSR',
            tags: [
                    'csr',
                    'certificate_signing_request',
                    'certificate_request',
                    'certificate_request_signing',
                ],
            is_checked: false
        }
    },
    props: ['eventBtClicked'],    
    watch: {
        eventBtClicked(data) {
            if (data === true && this.is_checked === true){
                this.processEvent();
            }   
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

        processEvent() {

            /**
             * Emit event with the generated csr
             * when the button is clicked and the checkbox is checked
             * and the generate csr is ready
             */
            this.generateCsr().then((csr_result) => {
                this.$emit('event_data', csr_result);
            }).catch((error) => {
                console.error(error);
            });
        },        

        async generateCsr() {
           
            // Cria uma nova chave RSA de 2048 bits
            const keys = forge.pki.rsa.generateKeyPair(2048);

            // Cria uma solicitação de assinatura de certificado (CSR) com a chave gerada
            const csr = forge.pki.createCertificationRequest();
            csr.publicKey = keys.publicKey;
            csr.setSubject([
                { name: 'commonName', value: 'example.com' }, 
                { name: 'countryName', value: 'US' },         
                { name: 'organizationName', value: 'Data Ninja' } 
            ]);

            // Define o algoritmo de hash SHA-256
            csr.sign(keys.privateKey, forge.md.sha256.create());

            // Converte o CSR para formato PEM
            const csrPem = forge.pki.certificationRequestToPem(csr);

            // Adiciona o CSR ao DataStore
            // this.dataStore.add(
            //     this.name,
            //     csrPem
            // );

            return {
                "field": this.name,
                "tags": this.tags,
                "value": csrPem
            }   
        }
    }
}
</script>