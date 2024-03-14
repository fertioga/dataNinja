chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.action === "searchAndWriteField") {
  
        let tagToFind = request.parameter.tags // parameter to search field
        let valueToInject = request.parameter.value // value to insert into field
  
        const fields = document.querySelectorAll('input'); // List all fields of page

        for (const field of fields) { // Iterate to find 

            const cleanedFieldId = field.id.replace(/[_-]/g, '');
            const cleanedFieldName = field.name.replace(/[_-]/g, '');

            if (tagToFind.some(tag => cleanString(tag).includes(cleanedFieldId) || cleanString(tag).includes(cleanedFieldName)))
                field.value = valueToInject;
        }
    }
  });

function cleanString(str) {
    return str.replace(/[_-]/g, '');
}