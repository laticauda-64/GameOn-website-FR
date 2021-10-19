// DOM Elements
const modalbg = document.querySelector('.bground'); // Fenêtre modal (y compris le background gris)
const closeModalButton = document.querySelector('.close'); // Bouton de fermeture de la fenêtre
const modalBtn = document.querySelectorAll('.modal-btn'); // Boutons d'inscription : 2 un en desktop et un autre en responsive mobile
const formData = document.querySelectorAll('.formData input'); // Tous les champs du form (input, select, checkboxes)
const inputsToTest = Array.from(formData).filter((e) => e.type === 'text' || e.type === 'email' || e.type === 'number' || e.id === 'checkbox1');
const radioInputsToTest = Array.from(formData).filter((e) => e.type === 'radio');

// Regular Expressions
const regExpList = {
    // Valid text fiedl with 2 alphanumeric characters, non-empty
    nameField: /^\w{2,}( +\w+)*$/i,
    // Valid email field
    emailField: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
    // Valid numeric value between 0 and 99
    numericField: /^[0-9]?[0-9]$/,
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
function validateInput(input) {
    switch (input.id) {
        case 'first':
            return regExpList.nameField.test(input.value);
        case 'last':
            return regExpList.nameField.test(input.value);
        case 'email':
            return regExpList.emailField.test(input.value);
        case 'quantity':
            return regExpList.numericField.test(input.value);
        case 'checkbox1':
            return input.checked;

        default:
            break;
    }
}

function validate(event) {
    event.preventDefault();
    if (radioInputsToTest.some((e) => e.checked) && inputsToTest.every((e) => validateInput(e))) {
        console.log('je valide le formulaire');
        return true;
    }
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
