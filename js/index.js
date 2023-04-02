const prenom = localStorage.getItem('prenom');


document.getElementById('form').addEventListener('submit', (e) => {
    e.preventDefault();
    var prenom = localStorage.getItem('prenom');
    console.log(prenom); // affichera "John"
    localStorage.setItem('prenom', document.getElementById('prenom').value);
    window.location.href = './tasks.html';
})
