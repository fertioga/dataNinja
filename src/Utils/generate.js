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
    const dddsBrasil = ["11", "12", "13", "14", "15", "16", "17", "18", "19", "21", "22", "24", "27", "28", "31", "32", "33", "34", "35", "37", "38", "41", "42", "43", "44", "45", "46", "47", "48", "49", "51", "53", "54", "55"];
    
    // Helper function to generate random number with specific length
    function randomNumber(length, maxNumber = 0) {

        if(maxNumber > 0) 
            return Math.floor(Math.random() * maxNumber);
        
        return Math.floor(Math.random() * Math.pow(10, length));
    }

    // Generate phone numbers based on the format
    switch (format) {
        case 'cellphoneBr':
            phoneNumber = `(${dddsBrasil[Math.floor(Math.random() * dddsBrasil.length)]}) 9${randomNumber(4).toString().padStart(4, '0')}-${randomNumber(4).toString().padStart(4, '0')}`;
            break;
        case 'cellphoneUs':
            phoneNumber = `+1 (${randomNumber(3)}) ${randomNumber(3)}-${randomNumber(4)}`;
            break;
        case 'phoneBr':
            phoneNumber = `(${dddsBrasil[Math.floor(Math.random() * dddsBrasil.length)]}) ${randomNumber(4)}-${randomNumber(4)}`;
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

function generateUUID(type) {
    switch (type.toLowerCase()) {
        case 'v1':
            return generateUUIDv1();
        case 'v4':
            return generateUUIDv4();
        case 'v7':
            return generateUUIDv7();
        case 'ulid':
            return generateULID();
        default:
            return 'Tipo de UUID inválido';
    }
}

function generateUUIDv1() {
    // UUID v1
    let timestamp = Date.now();
    const uuid = 'xxxxxxxx-xxxx-1xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (timestamp + Math.random() * 16) % 16 | 0;
        timestamp = Math.floor(timestamp / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

function generateUUIDv4() {
    // UUID v4
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function generateUUIDv7() {
    // UUID v7
    let timestamp = Date.now();
    const uuid = 'xxxxxxxx-xxxx-7xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (timestamp + Math.random() * 16) % 16 | 0;
        timestamp = Math.floor(timestamp / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x7)).toString(16);
    });
    return uuid;
}

function generateULID() {
    // ULID
    const chars = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
    let ulid = '';
    for (let i = 0; i < 26; i++) {
        if (i === 14) {
            ulid += '1'; // Timestamp component
        } else {
            ulid += chars.charAt(Math.floor(Math.random() * chars.length));
        }
    }
    return ulid;
}

async function generateLoremIpsumParagraph() {
    try {
        // Faz uma solicitação GET para a API Lorem Ipsum com o número de palavras desejado
        const response = await fetch(`https://hipsum.co/api/?type=hipster-centric&paras=5&sentences=10`);

        // Verifica se a solicitação foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao acessar a API Lorem Ipsum');
        }

        // Converte a resposta para JSON
        const data = await response.json();

        // Retorna o parágrafo gerado
        const result = data[0];

        return result;

    } catch (error) {
        console.error('Ocorreu um erro:', error);
        return null;
    }
}

function generateSecurePassword() {
    const length = Math.floor(Math.random() * (20 - 8 + 1)) + 8; // Entre 8 e 20 caracteres
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()-_+=[]{}"; // Caracteres permitidos
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
}

async function generatePersonImage() {
    try {
        // Faz uma solicitação GET this person does not exist
        const response = await fetch(`https://thispersondoesnotexist.com/`);

        // Verifica se a solicitação foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao acessar a API Lorem Ipsum');
        }

        return response['url'];

    } catch (error) {
        console.error('Ocorreu um erro:', error);
        return null;
    }
}

export { 
        generateName, 
        generateEmail, 
        generateCompany,
        generatePhoneNumber,
        generateDate,
        generateUUID,
        generateLoremIpsumParagraph,
        generateSecurePassword,
        generatePersonImage
    }