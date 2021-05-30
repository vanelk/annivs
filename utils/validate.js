module.exports.validateContactCreate = (name, birthdate) => {
    const errors = {};
    if (name.trim() === '') {
        errors.name = 'Name is required'
    }
    let date = new Date(birthdate);
    if (isNaN(date)) errors.birthdate = "Invalid birthday value";
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}

module.exports.validateContactUpdate = (name, birthdate) => {
    const errors = {};
    if (name && name.trim() === '') {
        errors.name = 'Name is required';
    }
    if (birthdate) {
        let date = new Date(birthdate);
        if (isNaN(date)) errors.birthdate = "Invalid birthday value";
    }
    return {
        errors,
        valid: Object.keys(errors).length < 1
    }
}
