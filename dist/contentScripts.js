chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.action === "searchAndWriteField") {
  
        const tagToFind = request.parameter.tags // parameter to search field
        const valueToInject = request.parameter.value // value to insert into field
        
        // find and write into input fields
        injectValueIntoInputField(tagToFind, valueToInject);

        // find and write into textarea fields
        injectValueIntoAllTextareaField(valueToInject);        
    }
  });

  /** 
   * @param {string[]} tagToFind
   * @param {string} valueToInject
   * @returns {void}
   */
function injectValueIntoInputField(tagToFind, valueToInject) {
        
    const MIN_SIMILARITY = 20; // Similarity percentage to inject value into field
    const inputs = document.querySelectorAll('input:not([type="button"])'); // List all inputs of page

    // Iterate to find fields
    for (const field of inputs) { 

        const cleanedFieldId = cleanString(field.id);
        const cleanedFieldName = cleanString(field.name);

        // Iterate to find fields by tag to inject value
        for (const tag of tagToFind) {  

            const tagCleaned = cleanString(tag);

            const similarityId = calculateSimilarity(tagCleaned, cleanedFieldId);
            const similarityName = calculateSimilarity(tagCleaned, cleanedFieldName);

            // console.log("TAG:",tagCleaned, 
            //             " ID:", cleanedFieldId, " %:", similarityId, 
            //              " NAME: ",cleanedFieldName, " %:",similarityName)

            // if similarity is greater than MIN_SIMILARITY, inject value into field
            if (similarityId > MIN_SIMILARITY || similarityName > MIN_SIMILARITY) {

                field.value = valueToInject;

                // console.log("Injetado valor no campo: ", field.id, 
                //             " com a tag: ", tagCleaned, 
                //             " com similaridade de: ", "ID: ",cleanedFieldId,": ", similarityId, 
                //             " e ", cleanedFieldName, ": ", similarityName)

                break; // Para de verificar as outras tags para este campo
            }
        }
    }
}

/**
 * @param {string} valueToInject
 * @returns {void}
 */
function injectValueIntoAllTextareaField(valueToInject) {

    const textAreas = document.querySelectorAll('textarea'); // List all textAreas of page

        for (const field of textAreas) { // Iterate to find 

            field.value = valueToInject; // put value into all textarea
        
        }
}

function cleanString(str) {
    return str.replace(/[_-]/g, '').trim();
}

/**
 * 
 * @param {string} str1 
 * @param {string} str2 
 * @returns 
 */
function calculateSimilarity(str1, str2) {

    // Converte as strings para minúsculas para ignorar a diferença de maiúsculas e minúsculas
    const lowerStr1 = str1.toLowerCase();
    const lowerStr2 = str2.toLowerCase();
    
    // Função para encontrar todas as substrings de uma string
    function getSubstrings(str) {
        const substrings = [];
        for (let i = 0; i < str.length; i++) {
            for (let j = i + 1; j <= str.length; j++) {
                substrings.push(str.slice(i, j));
            }
        }
        return substrings;
    }

    // Obtém todas as substrings de cada string
    const substrings1 = getSubstrings(lowerStr1);
    const substrings2 = getSubstrings(lowerStr2);

    // Conta quantas substrings em comum as duas strings possuem
    let commonSubstrings = 0;
    for (let substring of substrings1) {
        if (substrings2.includes(substring)) {
            commonSubstrings++;
        }
    }

    // Calcula a porcentagem de similaridade com base na quantidade de substrings em comum
    const similarity = (commonSubstrings / Math.max(substrings1.length, substrings2.length)) * 100;
    return similarity.toFixed(2);
}
