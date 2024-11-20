// Initialize the signature pad
var signaturePad = new SignaturePad(document.getElementById('signature-canvas'), {
    backgroundColor: "rgb(255,255,255)"
});

// Clear the signature pad when the "Clear" button is pressed
document.getElementById('clear').addEventListener('click', function() {
    signaturePad.clear();
});
