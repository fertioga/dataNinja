<template>
     <checkboxComponent :id="id" :label="label" @is_checked="event_is_check"></checkboxComponent>
</template>
<script>
import { dataStore } from '/src/Stores/dataStore.js';
import { generateUUID } from '/src/Utils/generate.js';
import checkboxComponent from '/src/js/Components/DataGenerators/Checkbox.vue';

export default {
    components: {
        checkboxComponent
    },   
    data() {
        return {
            name: 'uuid_v4',
            id: 'check_uuid_v4',
            label: 'UUID (v4)',
            tags: [
                    'uuid',
                    'UUID',
                    'id',
                    'ID',
                    'unique_id',
                    'uniqueID',
                    'identifier',
                    'GUID',
                    'guid',
                    'unique_identifier',
                    'uniqueIdentifier',
                    'key',
                    'session_id',
                    'sessionId',
                    'tracking_id',
                    'trackingId',
                    'client_id',
                    'clientId',
                    'user_id',
                    'userId',
                    'order_id',
                    'orderId',
                    'transaction_id',
                    'transactionId',
                    'request_id',
                    'requestId',
                    'token',
                    'session_token',
                    'sessionToken',
                    'auth_token',
                    'authToken',
                    'access_token',
                    'accessToken',
                    'refresh_token',
                    'refreshToken',
                    'verification_id',
                    'verificationId',
                    'verification_token',
                    'verificationToken',
                    'device_id',
                    'deviceId',
                    'install_id',
                    'installId',
                    'device_uuid',
                    'deviceUUID',
                    'user_uuid',
                    'userUUID',
                    'item_id',
                    'itemId',
                    'asset_id',
                    'assetId',
                    'membership_id',
                    'membershipId',
                    'subscription_id',
                    'subscriptionId',
                    'event_id',
                    'eventId',
                    'log_id',
                    'logId',
                    'reference_id',
                    'referenceId',
                    'parent_id',
                    'parentId',
                    'child_id',
                    'childId',
                    'partner_id',
                    'partnerId',
                    'customer_id',
                    'customerId',
                    'product_id',
                    'productId',
                    'service_id',
                    'serviceId',
                    'campaign_id',
                    'campaignId',
                    'promotion_id',
                    'promotionId',
                    'affiliate_id',
                    'affiliateId',
                    'employee_id',
                    'employeeId',
                    'vendor_id',
                    'vendorId',
                    'category_id',
                    'categoryId',
                    'tag_id',
                    'tagId',
                    'file_id',
                    'fileId',
                    'image_id',
                    'imageId',
        
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

        processEvent() {
            return this.$emit('event_data', this.generateUUID("v4"));
        },

        generateUUID(format) {
           
            const uuid = generateUUID(format);

            // add in the dataStore
            this.dataStore.add(
                    "uuid_v4",
                    uuid
                );

            return {
                "field": this.name,
                "tags": this.tags,
                "value": uuid
            }
        }
    }
}
</script>