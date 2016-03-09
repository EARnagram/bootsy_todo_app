console.log('main.js loaded!');

// establish vars before start for debug help
var $form,
    $todoTask,
    $todoBootsyLevel,
    $personalTodo,
    $bootsyTodo;



$(function() {
  $form            = $("#new-todo");
  $todoTask        = $("#todo-task");
  $todoBootsyLevel = $("#todo-bootsy-level");
  $personalTodo    = $("#personalTodo");
  $bootsyTodo      = $("#bootsyTodo");

// p1
  $form.on("submit", function(evt) {
    evt.preventDefault();

    var task        = $todoTask.val();
    var bootsyLevel = $todoBootsyLevel.val();

    console.log({ task: task, bootsyLevel: bootsyLevel});

    //p2
    var newTodo = { task: task, bootsyLevel: bootsyLevel };

    $.ajax({
      type: "POST",
      url:  "/api/todos",
      data: newTodo
    }).then(
      function(todo) {
        console.log("Success:", todo);

        // When there is a success, clear the form.
        $todoTask.val("");
        $todoBootsyLevel.val("");

        return todo;
      },
      function(err) {
        console.log("Failed:", err);
      }// p3
    ).then(
      function(todo) {
        // Compile renderer from template:
        var renderTodo = _.template(`
          <li id="todo-<%= _id %>" class="todo-item bootsy<%= bootsyLevel %>">
            <%= task %>
            <input type="checkbox" name="todo[completed]" <%= completed ? "checked" : "" %> />
            <span class="remove-item">X</span>
          </li>
        `);

        // Render the todo:
        var todoHTML = renderTodo(todo);

        // Check the html:
        console.log(todoHTML);

        // Append it to the page:
        $bootsyTodo.append(todoHTML);
      }
    );
  });
});
