chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.action === "searchAndWriteField") {
  
        const tagToFind = request.parameter.tags // parameter to search field
        const valueToInject = request.parameter.value // value to insert into field
        
        // find and write into input fields
        const textField = injectValueIntoInputField(tagToFind, valueToInject, 'input:not([type="button"])');

        // find and write into textarea fields
        const textareaField = injectValueIntoInputField(tagToFind, valueToInject, 'textarea');
        
        // if textField or textareaField is true, return success
        sendResponse({ 
                        success: (textField || textareaField)? true : false
                    });
    }
  });

  /** 
   * @param {string[]} tagToFind
   * @param {string} valueToInject
   * @returns {boolean}
   */
function injectValueIntoInputField(tagToFind, valueToInject, querySelector) {
        
    const MIN_SIMILARITY = 30; // Similarity percentage to inject value into field
    const inputs = document.querySelectorAll(querySelector); // List all inputs of page

    // Iterate to find fields
    for (const field of inputs) { 

        const cleanedFieldId = cleanString(field.id);
        const cleanedFieldName = cleanString(field.name);

        // Iterate to find fields by tag to inject value
        for (const tag of tagToFind) {  

            const tagCleaned = cleanString(tag);
            
            if (cleanedFieldId.includes(tagCleaned) || cleanedFieldName.includes(tagCleaned)) {    

                field.value = valueToInject;

                animateFieldWhenFound(field);

                return true; // return to stop iteration
            }else{

                animeteFieldWhenNotFound(field);
            
            }
        }
    }

    return false;
}

/**
 * Clean string to compare
 * @param {string} str 
 * @returns 
 */
function cleanString(str) {
    return str.replace(/[_-]/g, '').trim();
}

/**
 * Animate field when found
 * @param {object} field 
 */
function animateFieldWhenFound(field) {

    setTimeout(()=>{

        field.style.backgroundColor = '#34eb83';
        field.style.transition = 'background-color 1s';
        setTimeout(() => {
            field.style.backgroundColor = '';
        }, 1000);

    },1500)
    
}

/**
 * Animate field when not found
 * @param {object} field 
 */
function animeteFieldWhenNotFound(field) {
    field.style.backgroundColor = '#f29b9b';
    field.style.transition = 'background-color 1s';
    setTimeout(() => {
        field.style.backgroundColor = '';
    }, 1000);
}
