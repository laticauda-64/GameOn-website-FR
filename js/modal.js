/* * * * * * * * * * * * * * * * * * * * * * * * * */
/*                                                 */
/*                  Variables                      */
/*                                                 */
/* * * * * * * * * * * * * * * * * * * * * * * * * */

/**
 * DOM ELEMENTS
 */
const modalbg = document.querySelector('.bground');
const closeModalButton = document.querySelector('.close');
const closeModalButtonSucessDialog = document.querySelector('.close-btn');
const modalBtn = document.querySelectorAll('.modal-btn');
const formData = document.querySelectorAll('.formData input');
const inputsToTest = Array.from(formData).filter((e) => e.type === 'text' || e.type === 'email' || e.type === 'date' || e.type === 'number' || e.id === 'checkbox1');
const radioInputsList = Array.from(formData).filter((e) => e.type === 'radio');

/**
 * Regular Expressions
 */
const regExpList = {
    // Valid text fiedl with 2 alphanumeric characters, non-empty
    nameField: /^\w{2,}( +\w+)*$/i,
    // Valid email field
    emailField: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    // Valid numeric value between 0 and 99
    numericField: /^[0-9]?[0-9]$/,
    // Valid birthdate
    birthdateField: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
};

/* * * * * * * * * * * * * * * * * * * * * * * * * */
/*                                                 */
/*                  Functions                      */
/*                                                 */
/* * * * * * * * * * * * * * * * * * * * * * * * * */

/**
 * Open/Close Responsive burger menu
 * @returns void
 */
function editNav() {
    const x = document.getElementById('myTopnav');
    x.className === 'topnav' ? (x.className += ' responsive') : (x.className = 'topnav');
}

/**
 * Launch & close the modal
 * @returns void
 */
function switchModal() {
    modalbg.style.display === '' ? (modalbg.style.display = 'block') : (modalbg.style.display = '');
}

/**
 * Validate an input field by testing it against regexp
 * @param {HTMLInputElement} input - an input field to validate
 * @returns {boolean} boolean
 */
function validateInputField(input) {
    switch (input.id) {
        case 'first':
            return regExpList.nameField.test(input.value) ? removeError(input) : setError(input, 'Veuillez entrer 2 caractères ou plus pour le champ du nom.');
        case 'last':
            return regExpList.nameField.test(input.value) ? removeError(input) : setError(input, 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.');
        case 'email':
            return regExpList.emailField.test(input.value) ? removeError(input) : setError(input, 'Veuillez entrer un email valide.');
        case 'birthdate':
            return regExpList.birthdateField.test(input.value) ? removeError(input) : setError(input, 'Vous devez entrer votre date de naissance.');
        case 'quantity':
            return regExpList.numericField.test(input.value) ? removeError(input) : setError(input, 'Veuillez entrer une quantité valide (nombre).');
        case 'checkbox1':
            return input.checked ? removeError(input) : setError(input, 'Vous devez vérifier que vous acceptez les termes et conditions.');

        default:
            break;
    }
}

/**
 * Validate if one of the radio button is selected
 * It test if one of the input in the given array match the condition checked === true
 * @param {Array<HTMLInputElement>} radioInputList - An array of input elements
 * @returns {boolean} boolean
 */
function validateRadioFields(radioInputList) {
    return radioInputList.some((e) => e.checked) ? removeError(radioInputList[0]) : setError(radioInputList[0], 'Vous devez choisir une option.');
}
/**
 * Set two dataset 'error' property on given input parent node to display corresponding error message
 * @param {HTMLInputElement} input - An input element
 * @param {string} errorMsg - A string, the message to display
 * @returns {false} false
 */
function setError(input, errorMsg) {
    input.parentNode.setAttribute('data-error', errorMsg);
    input.parentNode.setAttribute('data-error-visible', true);
    return false;
}
/**
 * Clear the error dataset on given input parent node and return true
 * @param {HTMLInputElement} input - An input element
 * @returns {true} true
 */
function removeError(input) {
    input.parentNode.removeAttribute('data-error');
    input.parentNode.removeAttribute('data-error-visible');
    return true;
}
/**
 * Validate the form before submitting it
 * @param {SubmitEvent} Submit event from the form
 * @returns {boolean} Boolean - True or false according to the form validation results
 */
function validateForm(event) {
    event.preventDefault();
    inputsToTest.map((input) => validateInputField(input)).every((e) => e) && validateRadioFields(radioInputsList) ? showSuccessModal() : false;
}

/**
 * Show submit success
 * @returns {void}
 */
function showSuccessModal() {
    document.querySelector('.register').style.display = 'none';
    document.querySelector('.success-dialog').style.display = 'flex';
}

/* * * * * * * * * * * * * * * * * * * * * * * * * */
/*                                                 */
/*              Event Listeners                    */
/*                                                 */
/* * * * * * * * * * * * * * * * * * * * * * * * * */

/**
 * Launch & close modal event
 */
modalBtn.forEach((btn) => btn.addEventListener('click', switchModal));
modalBtn.forEach((btn) => btn.addEventListener('click', switchModal));
closeModalButton.addEventListener('click', switchModal);
closeModalButtonSucessDialog.addEventListener('click', switchModal);

/**
 * Validate input fields when they loose focus
 */
inputsToTest.forEach((input) =>
    input.addEventListener('blur', function () {
        validateInputField(this);
    })
);
