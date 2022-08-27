const validator = require('validator').default;
const { isEmpty } = require('../../utils');

module.exports = function validateCategory(data) {
    const errors = {};
    data.category_name = !isEmpty(data.category_name) ? validator.escape(data.category_name) : '';
    data.category_details = !isEmpty(data.category_details) ? validator.escape(data.category_details) : '';
    data.category_status = !isEmpty(data.category_status) ? validator.escape(data.category_status) : '';

    // category_name validation
    if (!validator.isLength(data.category_name, { min: 3, max: 30 })) {
        errors.category_name = 'Category Name must be between 3 and 30 characters';
    } else if (validator.isEmpty(data.category_name)) {
        errors.category_name = 'Category Name is required';
    }

    // category status validation
    if (validator.isEmpty(data.category_status)) {
        errors.category_status = "Catagory status is required";
    } else if (!(data.category_status === "enable") && !(data.category_status === "disable")) {
        errors.category_status = "Category status must be 'enable' or 'disable'";
    }

    return {
        errors,
        isValid: isEmpty(errors),
        data,
    };
};