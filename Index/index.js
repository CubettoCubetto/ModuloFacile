// Ensure the form submission doesn't trigger default behavior if invalid
const form = document.getElementById('liberatoriaForm');
const nomeInput = document.getElementById('nome-input');
const checkbox = document.getElementById('flexCheckDefault');
const nomePlaceHolder = document.getElementById('nome_placeHolder');

// Function to validate the name input (at least two words)
function validateName(create_exception=false) {
    const nameValue = nomeInput.value.trim();
    if (nameValue.split(' ').length < 2) {
        nomeInput.classList.add('is-invalid');
        nomeInput.classList.remove('is-valid');
        if(create_exception){
            alert("Perfavore, inserisci il tuo nome e cognome all'inizio della pagina");
            nomeInput.scrollIntoView({
                behavior: 'smooth', // Smooth scroll
                block: 'center'      // Align to the top of the viewport
            });
            return false;
        }

    } else {
        nomeInput.classList.remove('is-invalid');
        nomeInput.classList.add('is-valid');
    }
    return true;
}

// Validate the checkbox
function validateCheckbox() {
    if (!checkbox.checked) {
        checkbox.classList.add('is-invalid');
        checkbox.classList.remove('is-valid');
        alert("Perfavore, accetta termini e condizioni");
        checkbox.scrollIntoView({
            behavior: 'smooth', // Smooth scroll
            block: 'center'      // Align to the top of the viewport
        });
    } else {
        checkbox.classList.remove('is-invalid');
        checkbox.classList.add('is-valid');
    }
}

function updateNamePlaceholder() {
    nomePlaceHolder.textContent = nomeInput.value.trim();
}


// Add event listener for checkbox change to immediately update validation style
checkbox.addEventListener('change', function() {
    if (checkbox.checked) {
        checkbox.classList.remove('is-invalid');
        checkbox.classList.add('is-valid');
    } else {
        checkbox.classList.remove('is-valid');
        checkbox.classList.add('is-invalid');
    }
});

// Add event listener for name input to instantly update validation style
nomeInput.addEventListener('input', function() {
    validateName(); // Validate the name as the user types
    updateNamePlaceholder(); // Update the name in the placeholder span
});

// Form submission event
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission to validate first

    // Validate name, checkbox, and signature
    var success = validateName(true);
    if(!success){
        return;
    }
    validateCheckbox();

    // Check if all fields are valid
    if (form.checkValidity()) {
        // If valid, submit the form or process the data here (e.g., send data to the server)
        
        document.querySelector('.is-invalid')?.classList.remove('is-invalid'); // Remove validation errors

        if(signaturePad.isEmpty()){
            alert("Perfavore, firma il documento");
            return;
        }
        alert('Grazie e buona serata!');
        form.reset(); // Reset the form


    }
    
});

// Initialize current date on page load
window.onload = function() {
    const dataElement = document.getElementById('data_placeHolder');
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('it-IT', { month: 'long' });
    const year = today.getFullYear();
    dataElement.textContent = `${day} ${month} ${year}`;
};

// Clear the signature pad on button click
document.getElementById('clear').addEventListener('click', function() {
    signaturePad.clear();
});
