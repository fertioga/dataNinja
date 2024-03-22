<template>
    <div class="form-check">
        <input class="form-check-input" v-model="is_check_csr" type="checkbox" value="" id="check_csr">
        <label class="form-check-label" for="check_csr">
            CSR
        </label>
    </div>
</template>
<script>
import { dataStore } from '/src/Stores/dataStore.js';
import forge from 'node-forge';

export default {
    data() {
        return {
            name: 'csr',
            tags: [
                    'csr',
                    'certificate_signing_request',
                    'certificate_request',
                    'certificate_request_signing',
                ],
            is_check_csr: false,
            dataStore: dataStore()
        }
    },
    props: ['eventBtClicked'],
    watch: {
        eventBtClicked(data) {
            if (data === true && this.is_check_csr === true) 
                this.processEvent();
            
        }
    },
    methods: {
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
           
            // Cria uma nova chave RSA de 4096 bits
            const keys = forge.pki.rsa.generateKeyPair(2048);

            // Cria uma solicitação de assinatura de certificado (CSR) com a chave gerada
            const csr = forge.pki.createCertificationRequest();
            csr.publicKey = keys.publicKey;
            csr.setSubject([
                { name: 'commonName', value: 'example.com' }, 
                { name: 'countryName', value: 'US' },         
                { name: 'organizationName', value: 'Example Inc' } 
            ]);

            // Assina o CSR com a chave privada
            csr.sign(keys.privateKey);

            // Converte o CSR para formato PEM
            const csrPem = forge.pki.certificationRequestToPem(csr);

            this.dataStore.add(
                this.name,
                csrPem
            );

            return {
                "field": this.name,
                "tags": this.tags,
                "value": csrPem
            }
        }
    }
}
</script>