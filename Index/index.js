var nome = "";
var cognome = "";

function inserisciData() {
    const dataElement = document.getElementById('data_placeHolder');
    const oggi = new Date();
    
    // Formattazione della data in italiano
    const giorno = oggi.getDate();
    const mese = oggi.toLocaleString('it-IT', { month: 'long' });
    const anno = oggi.getFullYear();
    
    // Scrive la data nel formato "18 novembre 2024"
    dataElement.innerHTML = `${giorno} ${mese} ${anno}`;
}

function aggiornaNome(){
    const dataElement = document.getElementById("nome_placeHolder");
    nome = document.getElementById("nome-input").value;
    cognome = document.getElementById("cognome-input").value;
    const nome_completo = nome+" "+cognome;
    dataElement.innerHTML = nome_completo;
}
document.addEventListener('DOMContentLoaded', function() {
    // Questa funzione viene eseguita dopo che il DOM è completamente caricato
    inserisciData();
    ("#signature").jSignature()
});


