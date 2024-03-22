import { defineStore } from 'pinia'

export const dataStore = defineStore('dataStore', {

    state: () => {
        return { 
            loading: false,
            dataGenerated: [] 
        }
    },

    actions: {

        /**
         * Add a key-value pair to the dataGenerated array
         * @param {string} key 
         * @param {string} value 
         */
        add(key, value) {

            // first delete the key if it exists
            this.delete(key)

            let data = {
                "key": key,
                "value": value
            }
            
            this.dataGenerated.push(data);           
        },

        /**
         * Delete a key-value pair from the dataGenerated array
         * @param {string} key 
         */
        delete(key) {
            const index = this.dataGenerated.findIndex(el => el.key === key);
            if (index !== -1) {
                this.dataGenerated.splice(index, 1);
            }
        },
        
        /**
         * Clear the dataGenerated array
         */
        clear() {
            this.dataGenerated = []
        },

        /**
         * Get the value by key
         * @param {string} key 
         * @returns 
         */
        getByKey(key) {
            const result = this.dataGenerated.filter(el => { return el.key === key })
            return result
        },

        /**
         * Validate if a key exists
         * @param {string} key 
         * @returns 
         */
        keyExists(key) {
            const result = this.dataGenerated.filter(el => { return el.key === key })
            return result.length > 0
        },

        /**
         * Set loading state
         * @param {boolean} value
         */
        setLoading(value) {
            this.loading = value
        },

        /**
         * Set loading state for a period of time
         * @param {number} microseconds 
         */
        setLoadingDuring(microseconds) {
            this.loading = true
            setTimeout(() => {
                this.loading = false
            }, microseconds)
        },

        /**
         * Get loading state 
         * @returns {boolean}
         */
        getLoading() {
            return this.loading
        }   

    },

    getters: {
        /**
         * Get the dataGenerated array
         * @returns {Array}
         */
        getData() {
            return this.dataGenerated
        },
        
    },
})
