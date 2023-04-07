let url = new URL(window.location.href);
console.log(url);
let searchParams = new URLSearchParams(url.search);
let id = searchParams.get('id');
let isLtodoTask = false;
let lTodo = null;
let lTodos = JSON.parse(localStorage.getItem('tasks'));


//vérifier si la valeur de lTodos est nulle 
// avant d'appeler la méthode forEach().
if (Array.isArray(lTodos) && lTodos !== null) {
  lTodos.forEach(todo => {
    if (todo.id == id) {
      isLtodoTask = true;
      lTodo = todo;
    }

  });



}


if (isLtodoTask) {
  const listDiv = document.createElement('div');
  listDiv.id = 'list';



  // Création de la div pour chaque élément de la liste
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  // Ajout du texte de la tâche / couleur
  const textElement = document.createElement('span');
  textElement.innerHTML = lTodo.title;
  textElement.textContent = "Tâche : " + lTodo.title;
  textElement.classList.add('title');
  todoDiv.appendChild(textElement);

  // Ajout de l'état de la tâche
  const isCompleteElement = document.createElement('span');
  isCompleteElement.innerHTML = lTodo.is_complete ? 'Status : Terminé' : 'Status : À faire';
  isCompleteElement.classList.add(lTodo.is_complete ? 'done' : 'not-done');
  todoDiv.appendChild(isCompleteElement);

  // Ajout des tags de la tâche
  const tagsElement = document.createElement('span');
  tagsElement.innerHTML = lTodo.Tags;
  tagsElement.textContent = "Tags : " + lTodo.tags;
  tagsElement.classList.add('tags');

  todoDiv.appendChild(tagsElement);

  // Ajout des boutons pour la suppression/modification de la tâche/ réouverture de la tâche
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = 'Supprimer';
  deleteButton.classList.add('delete');

  const updateButton = document.createElement('button');
  updateButton.innerHTML = 'Modifier';
  updateButton.classList.add('update');

  const openButton = document.createElement('button');
  openButton.innerHTML = 'Re-ouvrir';
  openButton.classList.add('re-open');



  // Quand on click sur le boutton supprimer
  deleteButton.onclick = () => {
    deleteTask(todoDiv);
  };


  // Quand on click sur le boutton modifier
  updateButton.onclick = () => {
    updateButton(lTodo);
  };



  openButton.onclick = () => {
    updateTask(lTodo, isCompleteElement);
  };

  // On affiche les boutons

  todoDiv.appendChild(updateButton);
  todoDiv.appendChild(openButton);
  todoDiv.appendChild(deleteButton);

  // Ajout de la div de la tâche dans la div de la liste
  listDiv.appendChild(todoDiv);


  // Ajout de la div de la liste dans le DOM
  const appElement = document.getElementById('app');
  appElement.appendChild(listDiv);
} else {


  fetch('https://my-json-server.typicode.com/LoickLeBorgne/todo-back-end/todolist/' + id).then(response => response.json()).then(data => {

    console.log(data);
    document.getElementById('title').innerHTML = data.text;
  });

  // Récupération des données JSON depuis l'API
  fetch('https://my-json-server.typicode.com/LoickLeBorgne/todo-back-end/todolist/' + id)
    .then(response => response.json())
    .then(todo => {
      console.log(todo);
      // Création de la div pour contenir les éléments de la liste
      const listDiv = document.createElement('div');
      listDiv.id = 'list';



      // Création de la div pour chaque élément de la liste
      const todoDiv = document.createElement('div');
      todoDiv.classList.add('todo');

      // Ajout du texte de la tâche / couleur
      const textElement = document.createElement('span');
      textElement.innerHTML = todo.text;
      textElement.textContent = "Tâche : " + todo.text;
      textElement.classList.add('title');
      todoDiv.appendChild(textElement);

      // Ajout de l'état de la tâche
      const isCompleteElement = document.createElement('span');
      isCompleteElement.innerHTML = todo.is_complete ? 'Status : Terminé' : 'Status : À faire';
      isCompleteElement.classList.add(todo.is_complete ? 'done' : 'not-done');
      todoDiv.appendChild(isCompleteElement);

      // Ajout des tags de la tâche
      const tagsElement = document.createElement('span');
      tagsElement.innerHTML = todo.Tags;
      tagsElement.textContent = "Tags : " + todo.Tags;
      tagsElement.classList.add('tags');

      todoDiv.appendChild(tagsElement);

      // Ajout des boutons pour la suppression/modification de la tâche/ réouverture de la tâche
      const deleteButton = document.createElement('button');
      deleteButton.innerHTML = 'Supprimer';
      deleteButton.classList.add('delete');

      const updateButton = document.createElement('button');
      updateButton.innerHTML = 'Modifier';
      updateButton.classList.add('update');

      const openButton = document.createElement('button');
      openButton.innerHTML = 'Re-ouvrir';
      openButton.classList.add('re-open');



      // Quand on click sur le boutton supprimer
      deleteButton.onclick = () => {
        deleteTask(todoDiv);
      };


      // Quand on click sur le boutton modifier
      updateButton.onclick = () => {
        updateTask(todo, isCompleteElement);
      };

      // On affiche les boutons

      todoDiv.appendChild(updateButton);
      todoDiv.appendChild(openButton);
      todoDiv.appendChild(deleteButton);

      // Ajout de la div de la tâche dans la div de la liste
      listDiv.appendChild(todoDiv);


      // Ajout de la div de la liste dans le DOM
      const appElement = document.getElementById('app');
      appElement.appendChild(listDiv);
    })
    .catch(error => console.error(error));
}






// La fonction pour modifier la todo-list


function updateTaskStatus(id, status) {
  fetch('https://my-json-server.typicode.com/LoickLeBorgne/todo-back-end/todolist/' + id, {
    method: 'PATCH',
    body: JSON.stringify({ is_complete: status }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

function deleteTask(todoDiv){
  if (isCompleteElement.classList.contains('done')) {
    listDiv.removeChild(todoDiv);
  } else {
    alert("L'élément doit être réalisé pour être supprimé.");
  }
}

function updateTask(lTodo, isCompleteElement){
  lTodo.is_complete = !lTodo.is_complete;

  // Mettre à jour l'affichage de l'état de la tâche
  isCompleteElement.innerHTML = lTodo.is_complete ? 'Status : Terminé' : 'Status : À faire';
  isCompleteElement.classList.replace(lTodo.is_complete ? 'not-done' : 'done', lTodo.is_complete ? 'done' : 'not-done');
}

function openButton(lTodo){
  lTodo.is_complete = !lTodo.is_complete;

    // Mettre à jour l'affichage de l'état de la tâche
    isCompleteElement.innerHTML = lTodo.is_complete ? 'Status : Terminé' : 'Status : À faire';
    isCompleteElement.classList.replace(lTodo.is_complete ? 'not-done' : 'done', lTodo.is_complete ? 'done' : 'not-done');
}