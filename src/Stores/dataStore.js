import { defineStore } from 'pinia'

export const dataStore = defineStore('dataStore', {

    state: () => {
        return { dataGenerated: [] }
    },

    actions: {

        add(key, value) {

            // first delete the key if it exists
            this.delete(key)

            let data = {
                "key": key,
                "value": value
            }
            
            this.dataGenerated.push(data);
           
        },

        delete(key) {
            const index = this.dataGenerated.findIndex(el => el.key === key);
            if (index !== -1) {
                this.dataGenerated.splice(index, 1);
            }
        },
        
        clear() {
            this.dataGenerated = []
        },

        getByKey(key) {
            const result = this.dataGenerated.filter(el => { return el.key === key })
            return result
        },

        keyExists(key) {
            const result = this.dataGenerated.filter(el => { return el.key === key })
            return result.length > 0
        }
    },

    getters: {
        getData() {
            return this.dataGenerated
        },
        
    },
})
