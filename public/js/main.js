console.log('main.js loaded!');

var $personalTodo,
    $bootsyTodo;

$(document).ready(function() {
  $personalTodo = $("#personalTodo");
  $bootsyTodo   = $("#bootsyTodo");

  // Load the Todos on to the page!
  Todo
    .all()
    .then(function(todos) {
      todos.forEach(function(todo) {
        if (todo.data.completed) {
          $personalTodo.append(todo.$Element());
        } else {
          $bootsyTodo.append(todo.$Element());
        }
      });
    });

});
