// Récupération des données JSON depuis l'API
fetch('https://my-json-server.typicode.com/LoickLeBorgne/todo-back-end/todolist/')
  .then(response => response.json())
  .then(todoList => {
    console.log(todoList);

    // Compteur pour les tâches terminées
    const completedCount = todoList.filter(todo => todo.is_complete).length;

    // Compteur pour les tâches à faire
    const toDoCount = todoList.length - completedCount;

    // Sélection de l'élément avec la classe "app"
    const appElement = document.getElementById('stat');

    // Mise à jour du contenu de l'élément avec les compteurs
    appElement.innerHTML = `Tâches terminées : <span class="finished">${completedCount}</span> | Tâches à faire : <span class="unfinished">${toDoCount}</span>`;
  })
  .catch(error => console.error(error));