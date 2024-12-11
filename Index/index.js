var BACKEND_URL = "http://127.0.0.1:5000"
BACKEND_URL = "https://onmod.pythonanywhere.com/"
var DEBUG_FORM = false;
// Ensure the form submission doesn't trigger default behavior if invalid
const form = document.getElementById('liberatoriaForm');
const nomeInput = document.getElementById('nome-input');
const cellInput = document.getElementById('cellulare-input');
const checkbox = document.getElementById('flexCheckDefault');
var data_text = "";
// Function to validate the name input (at least two words)
function validateName(create_exception=false) {
    const nameValue = nomeInput.value.trim();
    if (nameValue.split(' ').length < 2) {
        nomeInput.classList.add('is-invalid');
        nomeInput.classList.remove('is-valid');
        if (create_exception){
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

function validatePhone(create_exception=false){
    const cellValue = cellInput.value.trim();
    if(cellValue >= 1_000_000_000 && cellValue < 10_000_000_000){
        cellInput.classList.remove('is-invalid');
        cellInput.classList.add('is-valid');
        return true;
    }
    if(cellValue == "" && !create_exception){
        cellInput.classList.remove('is-invalid');
    }
    else{
        cellInput.classList.add('is-invalid');
        cellInput.classList.remove('is-valid');
        if(create_exception){
            alert("Perfavore, inserisci un numero di telefono valido (10 cifre)");
            cellInput.scrollIntoView({
                behavior: 'smooth', // Smooth scroll
                block: 'center'      // Align to the top of the viewport
            });
        
        }
    }
    return false;  
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
        return false;
    } 
    checkbox.classList.remove('is-invalid');
    checkbox.classList.add('is-valid');
    return true;
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
});

cellInput.addEventListener('input', function() {
    validatePhone(false); // Validate the name as the user types
});

// Form submission event
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission to validate first
    startLoading();
    // Validate name, checkbox, and signature
    var success = validateName(true);
    if(!success){
        stopLoading();
        return;
    }
    var success_checkbox = validateCheckbox();
    if(!success_checkbox){
        stopLoading();
        return;
    }

    success_phone  = validatePhone(true);
    if(!success_phone){
        stopLoading();
        return;
    }
    // If valid, submit the form or process the data here (e.g., send data to the server)
        
    document.querySelector('.is-invalid')?.classList.remove('is-invalid'); // Remove validation errors

    if(signaturePad.isEmpty()){
        alert("Perfavore, firma il documento");
        stopLoading();
        return;
    }
    var backend_success = send_data();

    if(!backend_success && !DEBUG_FORM){
        alert("C'è stato un errore con l'elaborazione del modulo, perfavore ricontrolla tutti i dati inseriti e rimanda. Se il problema persiste contatta la segreteria")
        stopLoading();
        return;
    }
        
    window.location.href = "Grazie/grazie.html";
    
    
});

function send_data(){
    const dataURL = signaturePad.toDataURL('image/png');
    fetch(BACKEND_URL + '/save_signature', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            nome: nomeInput.value,
            image: dataURL,
            numero_tel: cellInput.value
        })
    })
    .then(response => {
        if (response.ok) {
            return true;
        } else {
            alert('Failed to save signature.');
            console.log(response);
            return false;
        }
    });
}

// Initialize current date on page load
window.onload = function() {
    const dataElement = document.getElementById('data_placeHolder');
    const today = new Date();
    const day = today.getDate();
    const month = today.toLocaleString('it-IT', { month: 'long' });
    const year = today.getFullYear();
    data_text = `${day} ${month} ${year}`;
    dataElement.textContent = data_text;
};
