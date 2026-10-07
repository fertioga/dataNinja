/**
 * Remove presentation-mask separators from generated fake-data values.
 * Unknown fields and non-string values are returned unchanged.
 *
 * @param {string} field - Generator field key (e.g. 'cpf', 'date_br')
 * @param {string|number} value - Generated value
 * @returns {string|number}
 */
function stripPresentationMask(field, value) {
    if (typeof value !== 'string') {
        return value;
    }

    const rule = RULES[field];
    if (!rule) {
        return value;
    }

    return rule(value);
}

/** @type {Record<string, (value: string) => string>} */
const RULES = {
    cpf: (v) => v.replace(/[.\-]/g, ''),
    ssn: (v) => v.replace(/-/g, ''),
    rg: (v) => v.replace(/[.\-]/g, ''),
    cnpj: (v) => v.replace(/[.\-/]/g, ''),
    cnpj_alpha: (v) => v.replace(/[.\-/]/g, ''),
    phone_br: (v) => v.replace(/[+\s()\-]/g, ''),
    phone_us: (v) => v.replace(/[+\s()\-]/g, ''),
    cellphone_br: (v) => v.replace(/[+\s()\-]/g, ''),
    cellphone_us: (v) => v.replace(/[+\s()\-]/g, ''),
    date_br: (v) => v.replace(/\//g, ''),
    date_us: (v) => v.replace(/\//g, ''),
    date_db: (v) => v.replace(/-/g, ''),
    cc_validate: (v) => v.replace(/\//g, ''),
    uuid_v1: (v) => v.replace(/-/g, ''),
    uuid_v4: (v) => v.replace(/-/g, ''),
    uuid_v7: (v) => v.replace(/-/g, ''),
};

export { stripPresentationMask };
