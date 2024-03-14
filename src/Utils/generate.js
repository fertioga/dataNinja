import { dataStore } from '../Stores/dataStore.js'
/**
 * Mix first and last names to generate a name
 * @returns a generated name
 */
async function generateName() {

    const listFirstName  = await getListFirstName();
    const listlastName   = await getListLastName();

    const firstName  = listFirstName[Math.floor(Math.random() * listFirstName.length)];
    const middleName = listFirstName[Math.floor(Math.random() * listFirstName.length)];
    const lastName   = listlastName[Math.floor(Math.random() * listlastName.length)];

    return firstName.concat(' ', middleName, ' ', lastName)
}

/**
 * Generate email based on the name
 */
function generateEmail(name) {

    const store = dataStore();
    let domain = '@example.com';

    if(store.keyExists('company')) {
        const company = store.getByKey('company')[0].value;
        domain = "@" + toCamelCase(company)
                        .replace(/[^a-zA-Z]/g, '')
                        .replace(/'/g, '')
                        .toLowerCase()
                        .concat('.com');
    }

    return name.replace(/ /g, '.')
                .replace(/'/g, '')
                .toLowerCase()
                .concat(domain);
}

/**
 * Generate a company name
 */
async function generateCompany() {
    
    const responseCompanyPromise = fetch('../Data/CompanyNames.json');
    const responseCompanyTypePromise = fetch('../Data/CompanyTypes.json');

    const [responseCompany, responseCompanyType] = await Promise.all([responseCompanyPromise, responseCompanyTypePromise]);

    if (!responseCompany.ok)
        throw new Error('=========== Failed to fetch responseCompany ==========');

    if (!responseCompanyType.ok)
        throw new Error('=========== Failed to fetch responseCompanyType ==========');

    const companyName = await responseCompany.json();
    const companyType = await responseCompanyType.json();

    const company = companyName[Math.floor(Math.random() * companyName.length)];
    const type = companyType[Math.floor(Math.random() * companyType.length)];

    return company
            .replace(/'/g, '')
            .concat(' ', type);
}

/**
 * Format a phrase to camel case
 * @param phrase 
 * @returns 
 */
function toCamelCase(phrase) {
    return phrase.toLowerCase()
                 .replace(/\s+(\w)/g, function(match, letter) {
                    return letter.toUpperCase();
                });
}

/**
 * Get and return a list of first names
 * @returns list of first names
 */
async function getListFirstName () {

    const response = await fetch('../Data/FirstNames.json');
        if (!response.ok) {
            throw new Error('=========== Failed to fetch Firsto Names ==========');
        }
    const firstNames = await response.json();
     
    return firstNames
}

/**
 * Get and return a list of last names
 * @returns list of last names
 */
async function getListLastName(){

    const response = await fetch('../Data/LastNames.json');
        if (!response.ok) {
            throw new Error('=========== Failed to fetch Last Names ==========');
        }
    const lastNames = await response.json();
     
    return lastNames;
}

function generatePhoneNumber(format) {
    let phoneNumber = '';
    
    // Helper function to generate random number with specific length
    function randomNumber(length, maxNumber = 0) {

        if(maxNumber > 0) 
            return Math.floor(Math.random() * maxNumber);
        
        return Math.floor(Math.random() * Math.pow(10, length));
    }

    // Generate phone numbers based on the format
    switch (format) {
        case 'cellphoneBr':
            phoneNumber = `(0${randomNumber(2, 28)}) 9${randomNumber(4)}-${randomNumber(4)}`;
            break;
        case 'cellphoneUs':
            phoneNumber = `+1 (${randomNumber(3)}) ${randomNumber(3)}-${randomNumber(4)}`;
            break;
        case 'phoneBr':
            phoneNumber = `(0${randomNumber(2, 28)}) ${randomNumber(4)}-${randomNumber(4)}`;
            break;
        case 'phoneUs':
            phoneNumber = `+1 (${randomNumber(3)}) ${randomNumber(3)}-${randomNumber(4)}`;
            break;
        default:
            throw new Error('Invalid format. Please provide a valid format.');
    }

    return phoneNumber;
}

function generateDate(format) {

    const today = new Date();
    const futureDate = new Date(today.getTime() + Math.random() * (365 * 24 * 60 * 60 * 1000 * 10)); // Adiciona até 10 anos no futuro

    switch(format.toUpperCase()) {
        case 'BR':
            return `${futureDate.getDate().toString().padStart(2, '0')}/${(futureDate.getMonth() + 1).toString().padStart(2, '0')}/${futureDate.getFullYear()}`;
        case 'US':
            return `${(futureDate.getMonth() + 1).toString().padStart(2, '0')}/${futureDate.getDate().toString().padStart(2, '0')}/${futureDate.getFullYear()}`;
        case 'DB':
            return `${futureDate.getFullYear()}-${(futureDate.getMonth() + 1).toString().padStart(2, '0')}-${futureDate.getDate().toString().padStart(2, '0')}`;
        case 'TIMESTAMP':
            return today.getTime();
        default:
            return 'Formato inválido';
    }
}

export { 
        generateName, 
        generateEmail, 
        generateCompany,
        generatePhoneNumber,
        generateDate
    }