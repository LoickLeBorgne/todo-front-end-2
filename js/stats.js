// Récupération du nom d'utilisateur dans le localstorage
const prenom = localStorage.getItem('prenom');

// On affiche le nom d'utilisateur
const usernameElement = document.getElementById('username');
usernameElement.innerHTML = 'Bonjour ' + prenom + ' !';

// On donne du style au nom d'utilisateur
usernameElement.style.color = "black";
usernameElement.style.fontSize = "37px";
usernameElement.style.marginTop = "40px";

// Récupération des données JSON depuis l'API avec fetch
fetch('https://my-json-server.typicode.com/LoickLeBorgne/todo-back-end/todolist')
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // Création de la div pour contenir les éléments de la liste
    const listDiv = document.createElement('div');
    listDiv.id = 'list';

    // Parcours des éléments de la liste et ajout dans la div
    data.forEach(todo => {

      // Création de la div pour chaque élément de la liste
      const todoDiv = document.createElement('div');
      todoDiv.classList.add('todo');

      // On ajoute le texte de la tâche
      const textElement = document.createElement('span');
      textElement.innerHTML = todo.text;
      todoDiv.appendChild(textElement);

      // On ajoute l'état de la tâche
      const isCompleteElement = document.createElement('span');
      isCompleteElement.innerHTML = todo.is_complete ? 'Réalisé' : 'À faire';
      isCompleteElement.classList.add(todo.is_complete ? 'done' : 'not-done');
      todoDiv.appendChild(isCompleteElement);

      // On ajoute les tags
      const tagsElement = document.createElement('span');
      tagsElement.innerHTML = todo.Tags;
      todoDiv.appendChild(tagsElement);

      // On ajoute le bouton detail et on récupère l'id de la tâche
      const deleteButton = document.createElement('button');
      const detailButton = document.createElement('a');

      detailButton.href = 'item.html?id=' + todo.id;
      detailButton.innerHTML = 'Détails';
      todoDiv.appendChild(detailButton);





      // Ajout de la div de la tâche dans la div de la liste
      listDiv.appendChild(todoDiv);
    });

    // Ajout de la div de la liste dans le DOM
    const localStorageElement = document.getElementById('app');
    localStorageElement.appendChild(listDiv);


    //On récupère les données des tâches depuis le localStorage

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Parcours des éléments de la liste et ajout dans la div
    tasks.forEach(todo => {
      // Création de la div pour chaque élément de la liste
      const todoDiv = document.createElement('div');
      todoDiv.classList.add('todo');

      // Ajout du texte de la tâche / couleur
      const textElement = document.createElement('span');
      textElement.innerHTML = todo.title;
      todoDiv.appendChild(textElement);

      // Ajout de l'état de la tâche
      const isCompleteElement = document.createElement('span');
      isCompleteElement.innerHTML = todo.status == 'completed' ? 'Réalisé' : 'À faire';
      isCompleteElement.classList.add(todo.status == 'completed' ? 'done' : 'not-done');
      todoDiv.appendChild(isCompleteElement);

      // Ajout des tags de la tâche
      const tagsElement = document.createElement('span');
      tagsElement.innerHTML = todo.tags;
      todoDiv.appendChild(tagsElement);

      // Ajout des boutons pour la suppression et la fin de la tâche
      const deleteButton = document.createElement('button');
      const detailButton = document.createElement('a');


      detailButton.href = 'item.html?id=' + todo.id;
      detailButton.innerHTML = 'Détails';
      todoDiv.appendChild(detailButton);

      // Ajout de la div de la tâche dans la div de la liste
      listDiv.appendChild(todoDiv);
    });

    // Ajout de la div de la liste dans le DOM
    const appElement = document.getElementById('app');
    appElement.appendChild(listDiv);
  })
  .catch(error => console.error(error));


// récupérer le formulaire et le bouton de soumission
const form = document.querySelector('.addtask');
const submitBtn = document.querySelector('.submit__task');

// ajouter un événement pour le bouton de soumission
submitBtn.addEventListener('click', (event) => {
  event.preventDefault();

  // récupérer les valeurs du formulaire
  const title = document.querySelector('#Title').value;
  const status = document.querySelector('#status-select').value;
  const tags = document.querySelector('#Tags').value;

  // créer un objet de tâche
  const task = {
    id: Date.now(),
    title: title,
    status: status,
    tags: tags
  };

  // récupérer le tableau existant ou créer un nouveau tableau
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // ajouter la tâche à la liste des tâches
  tasks.push(task);

  // enregistrer la liste des tâches mise à jour dans le stockage local
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // réinitialiser le formulaire
  form.reset();
});
