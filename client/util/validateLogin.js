
export default function validateLogin(data) {
    let errors = {};
    let noErrors = false;
    Object.keys(data).map(function(objectKey, index) {
        let value = data[objectKey];

        if (typeof value == 'string' && value.length < 1) {

            errors[objectKey] = 'This Field Is Required';

        }

    });
    noErrors = Object.keys(errors) === 0 ;
    return {
        errors,
        isValid: noErrors
    }

}
