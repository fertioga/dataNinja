<template>
    <div class="form-check">
        <input class="form-check-input" v-model="is_check_ulid" type="checkbox" value="" id="check_ulid">
        <label class="form-check-label" for="check_ulid">
            ULID
        </label>
    </div>
</template>
<script>
import { dataStore } from '/src/Stores/dataStore.js';
import { generateUUID } from '/src/Utils/generate.js';

export default {
    data() {
        return {
            name: 'ulid',
            tags: [
                    'ulid',
                    'ulid',
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
                    'device_ulid',
                    'deviceulid',
                    'user_ulid',
                    'userulid',
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
            is_check_cpf: false,
            dataStore: dataStore()
        }
    },
    props: ['eventBtClicked'],
    watch: {
        eventBtClicked(data) {
            if (data === true && this.is_check_ulid === true) 
                this.processEvent();
            
        }
    },
    methods: {
        processEvent() {
            return this.$emit('event_data', this.generateULID("ULID"));
        },

        generateULID(format) {
           
            const ulid = generateUUID(format);

            // add in the dataStore
            this.dataStore.add(
                    "ulid",
                    ulid
                );

            return {
                "field": this.name,
                "tags": this.tags,
                "value": ulid
            }
        }
    }
}
</script>