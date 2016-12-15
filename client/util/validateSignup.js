//import Validator from 'validator';
//import isEmpty from 'lodash/isEmpty';

export  function validateInput(data) {
    let errors = {};
    let typeOfUser = '';
    let noErros = false;
    Object.keys(data).map(function(objectKey, index) {
        let value = data[objectKey];

        if (typeof value == 'string' && value.length < 1) {

            errors[objectKey] = 'This Field Is Required';

        }
        if (data[objectKey] !== true && objectKey === 'terms') {
            errors.terms = 'Must Agree To Our Terms and Conditions';
        }

    });
    if (data.password !== data.passwordConfirm) {
        errors.password = 'Passwords Don\'t Match';
        errors.passwordConfrim = 'Passwords Don\'t Match';
    }
    noErrors = Object.keys(errors) === 0 ;
    return {
        errors,
        typeOfUser,
        isValid: noErrors
    }
}
