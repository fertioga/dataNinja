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
                
                /** dispach input event */
                const inputEvent = new Event('input', { bubbles: true, cancelable: true });
                field.dispatchEvent(inputEvent);

                /** dispach change event */
                const changeEvent = new Event('change', { bubbles: true });
                field.dispatchEvent(changeEvent);
                
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

    // wait 1.5s to animate because the not found will be animated first
    setTimeout(()=>{

        field.style.backgroundColor = '#50fa7b';
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
    field.style.backgroundColor = '#dc3545';
    field.style.transition = 'background-color 1s';
    setTimeout(() => {
        field.style.backgroundColor = '';
    }, 1000);
}
