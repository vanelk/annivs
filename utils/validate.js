module.exports.validateIndividualCreate = (name, birthdate) => {
    const errors = {};
    if (name.trim() === '') {
        errors.name = 'Name is required'
    }
    if (birthdate.trim() === '') {
        errors.birthdate = 'Birthdate is required'
    } else {
        let date = new Date(birthdate);
        if (isNaN(date)) errors.birthdate = "Invalid birthday value";
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateIndividualUpdate = (name, birthdate) => {
    const errors = {};
    if (name && name.trim() === '') {
        errors.name = 'Name is required';
    }
    if (birthdate) {
        if (birthdate.trim() === '') {
            errors.birthdate = 'Birthdate is required'
        } else {
            let date = new Date(birthdate);
            if (isNaN(date)) errors.birthdate = "Invalid birthday value";
        }
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateSetSpreadSheet = (spreadsheetId) => {
    const errors = {};
    if(spreadsheetId && spreadsheetId.trim() === ''){
        errors.spreadsheetId = 'spreadsheet required'
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}