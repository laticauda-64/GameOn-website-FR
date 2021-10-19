// DOM Elements
const modalbg = document.querySelector('.bground'); // Fenêtre modal (y compris le background gris)
const closeModalButton = document.querySelector('.close'); // Bouton de fermeture de la fenêtre
const modalBtn = document.querySelectorAll('.modal-btn'); // Boutons d'inscription : 2 un en desktop et un autre en responsive mobile
const formData = document.querySelectorAll('.formData input'); // Tous les champs du form (input, select, checkboxes)
const inputsToTest = Array.from(formData).filter((e) => e.type === 'text' || e.type === 'email' || e.type === 'date' || e.type === 'number' || e.id === 'checkbox1');
const radioInputsList = Array.from(formData).filter((e) => e.type === 'radio');

// Regular Expressions
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

// Open Responsive burger menu
function editNav() {
    const x = document.getElementById('myTopnav');
    if (x.className === 'topnav') {
        x.className += ' responsive';
    } else {
        x.className = 'topnav';
    }
}

// Launch & close modal event
modalBtn.forEach((btn) => btn.addEventListener('click', switchModal));
closeModalButton.addEventListener('click', switchModal);

// Launch & close modal form
function switchModal() {
    if (modalbg.style.display === '') {
        modalbg.style.display = 'block';
        return;
    }
    modalbg.style.display = '';
}

/**
 * Validate input field
 * @param {HTMLInputElement} input - an input field to validate
 * @returns Boolean
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

function validateRadioFields(radioInputList) {
    return radioInputList.some((e) => e.checked) ? removeError(radioInputList[0]) : setError(radioInputList[0], 'Vous devez choisir une option.');
}

function setError(input, errorMsg) {
    input.parentNode.setAttribute('data-error', errorMsg);
    input.parentNode.setAttribute('data-error-visible', true);
    return false;
}

function removeError(input) {
    input.parentNode.removeAttribute('data-error');
    input.parentNode.removeAttribute('data-error-visible');
    return true;
}

function validate(event) {
    event.preventDefault();
    inputsToTest.forEach((input) => validateInputField(input));
    validateRadioFields(radioInputsList);
    // if (radioInputsToTest.some((e) => e.checked) && formData.every((e) => validateInput(e))) {
    //     console.log('je valide le formulaire');
    //     return true;
    // }
    console.log('Je ne valide pas le formulaire');
    return false;
}

console.log(formData);

// Si un champs en erreur, doit avoir les propriétés html suivante : data-error="msg d'erreur" + data-error-visible="true"
// Quand l'input perd le focus, lancer une fonction de validation sur le champs
// Quand clic sur submit, valider tous les champs
// Si aucun attribut data-error dans le form, alors on validate
// Go fancy OOP design pattern !
// --> https://web-crunch.com/posts/vanilla-javascript-form-validation
