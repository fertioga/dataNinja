import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia'

export const checkboxStore = defineStore('checkboxStore', {
    state: () => ({
       checkboxes: useStorage('checkboxes',[])
    }),

    actions: {
        add(checkbox) {
            this.delete(checkbox)
            this.checkboxes.push(checkbox);
        },

        delete(checkbox) {
            const index = this.checkboxes.findIndex(el => el === checkbox);
            if (index !== -1)
                this.checkboxes.splice(index, 1);
        },

        clear() {
            this.checkboxes = [];
        },

        isCheckedById(id_checkbox) {
            const checkbox = this.checkboxes.find(el => el === id_checkbox);

            return(checkbox !== -1 && checkbox != undefined)?? false
        },

        getAll(){
            return this.checkboxes;
        },
    },

    getters: {
      //
    },
})
