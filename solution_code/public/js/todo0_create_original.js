console.log("todo0_create_original loaded!");

var $form,
    $todoTask,
    $todoBootsyLevel,
    $personalTodo,
    $bootsyTodo;

// Using a form on the DOM, so wrap in this.
$(document).ready(function() {
  // VERSION 1 *********************************************************

  // A. Grab the necessary elements off the DOM.
  $form            = $("#new-todo");
  $todoTask        = $("#todo-task");
  $todoBootsyLevel = $("#todo-bootsy-level");
  $personalTodo    = $("#personalTodo");
  $bootsyTodo      = $("#bootsyTodo");

  // B. Capture the form event, prevent default, and console the data:
  // $form.on("submit", function(evt) {
  //   evt.preventDefault();

  //   var task        = $todoTask.val();
  //   var bootsyLevel = $todoBootsyLevel.val();

  //   console.log({ task: task, bootsyLevel: bootsyLevel });
  // });

  // C. … ; trigger an AJAX create function, and console the outcome:
  // $form.on("submit", function(evt) {
  //   evt.preventDefault();

  //   var task        = $todoTask.val();
  //   var bootsyLevel = $todoBootsyLevel.val();
  //   var newTodo     = { task: task, bootsyLevel: bootsyLevel };

  //   $.ajax({
  //     type: "POST",
  //     url:  "/api/todos",
  //     data: newTodo
  //   }).then(
  //     function(r) {
  //       console.log("Success:", r);

  //       // When there is a success, clear the form.
  //       $todoTask.val("");
  //       $todoBootsyLevel.val("");
  //     },
  //     function(e) {
  //       console.log("Failed:", e);
  //     }
  //   );
  // });
  // REFRESH THE PAGE TO SEE IT IF THIS WORKS!!

  // D. … ; once the success comes back, generate HTML and add to page:
  // $form.on("submit", function(evt) {
  //   evt.preventDefault();

  //   var task        = $todoTask.val();
  //   var bootsyLevel = $todoBootsyLevel.val();
  //   var newTodo     = { task: task, bootsyLevel: bootsyLevel };

  //   $.ajax({
  //     type: "POST",
  //     url:  "/api/todos",
  //     data: newTodo
  //   }).then( // ***** Log success / failure, and clear form. *****
  //     function(todo) {
  //       console.log("Success:", todo);
  //       $todoTask.val("");
  //       $todoBootsyLevel.val("");

  //       return todo; // Pass the todo on to the next promise.
  //     },
  //     function(e) { console.log("Failed:", e); }
  //   ).then(  // ***** Generate the new HTML on the page. *****
  //       function(todo) {
  //       // Compile renderer from template:
  //       var renderTodo = _.template(`
  //         <li id="todo-<%= _id %>" class="todo-item bootsy<%= bootsyLevel %>">
  //           <%= task %>
  //           <input type="checkbox" name="todo[completed]" <%= completed ? "checked" : "" %> />
  //           <span class="remove-item">X</span>
  //         </li>
  //       `);

  //       // Render the todo:
  //       var todoHTML = renderTodo(todo);

  //       // Check the html:
  //       // console.log(todoHTML);

  //       // Append it to the page:
  //       $bootsyTodo.append(todoHTML);
  //     }
  //   );
  // });

  // VERSION 2 - REFACTOR **********************************************

  // A. Pull out AJAX call, the form clearing, and the rendering logic!
  function createTodo(todo) {
    return $.ajax({
      type: "POST",
      url:  "/api/todos",
      data: todo
    });
  }

  function onSuccessLogTodo(todo) {
    console.log("Success:", todo);
    return todo;
  }

  function onErrorLogFailure(err) {
    console.log("Failed:", err);
  }

  function clearForm(todo) {
    $todoTask.val("");
    $todoBootsyLevel.val("");

    return todo;
  }

  // function displayTodo(todo) {
  //   var renderTodo = _.template(`
  //     <li id="todo-<%= _id %>" class="todo-item bootsy<%= bootsyLevel %>">
  //       <%= task %>
  //       <input type="checkbox" name="todo[completed]" <%= completed ? "checked" : "" %> />
  //       <span class="remove-item">X</span>
  //     </li>
  //   `);
  //   var todoHTML = renderTodo(todo);

  //   $bootsyTodo.append(todoHTML);
  // }

  // B. Plug these into a slimmed form submit:
  $form.on("submit", function(evt) {
    evt.preventDefault();

    var task        = $todoTask.val();
    var bootsyLevel = $todoBootsyLevel.val();
    var newTodo     = { task: task, bootsyLevel: bootsyLevel };

    createTodo(newTodo)
       .then(
        onSuccessLogTodo,
        onErrorLogFailure
      ).then(
        clearForm
      ).then(
        displayTodo
      );
  });

  // VERSION 3 - ADD ACTIONS *******************************************

  // A. Add an onChange event to the checkbox on the list item. Console!
  // function displayTodo(todo) {
  //   var renderTodo = _.template(`
  //     <li id="todo-<%= _id %>" class="todo-item bootsy<%= bootsyLevel %>">
  //       <%= task %>
  //       <input type="checkbox" name="todo[completed]" <%= completed ? "checked" : "" %> />
  //       <span class="remove-item">X</span>
  //     </li>
  //   `);
  //   var todoHTML  = renderTodo(todo);
  //   var $todoHTML = $(todoHTML);

  //   $todoHTML.find("input[type=checkbox]").on("change", function(evt) {
  //     console.log("Freaky swinging, boo boo:", evt);
  //   });

  //   $bootsyTodo.append($todoHTML);
  // }

  // B. On change, switch the list of the todo.
  // function displayTodo(todo) {
  //   var renderTodo = _.template(`
  //     <li id="todo-<%= _id %>" class="todo-item bootsy<%= bootsyLevel %>">
  //       <%= task %>
  //       <input type="checkbox" name="todo[completed]" <%= completed ? "checked" : "" %> />
  //       <span class="remove-item">X</span>
  //     </li>
  //   `);
  //   var todoHTML  = renderTodo(todo);
  //   var $todoHTML = $(todoHTML);

  //   $todoHTML.find("input[type=checkbox]").on("change", function(evt) {
  //     $todoHTML.detach();
  //     if ($todoHTML.find("input[type=checkbox]").is(":checked")) {
  //       $personalTodo.append($todoHTML);
  //     } else {
  //       $bootsyTodo.append($todoHTML);
  //     }
  //   });

  //   $bootsyTodo.append($todoHTML);
  // }

  // C. On change, update the database and then switch.
  function updateTodo(id, todo) {
    return $.ajax({
      type: "PUT",
      url:  "/api/todos/" + encodeURIComponent(id),
      data: todo
    });
  }

  function switchList($todo) {
    $todo.detach();
    if ($todo.find("input[type=checkbox]").is(":checked")) {
      $personalTodo.append($todo);
    } else {
      $bootsyTodo.append($todo);
    }
  }

  function displayTodo(todo) {
    var renderTodo = _.template(`
      <li id="todo-<%= _id %>" class="todo-item bootsy<%= bootsyLevel %>">
        <%= task %>
        <input type="checkbox" name="todo[completed]" <%= completed ? "checked" : "" %> />
        <span class="remove-item">X</span>
      </li>
    `);
    var todoHTML  = renderTodo(todo);
    var $todoHTML = $(todoHTML);

    $todoHTML.find("input[type=checkbox]").on("change", function(evt) {
      var currentTodoData = {
        _id:         "",   // Dear Ezra,
        task:        "",   // At this point you have to figure out how
        bootsyLevel: 0,    // to pull this data out of the $todoHTML
        completed:   false // element (using find and parsing)... Sorry.
      };

      updateTodo(currentTodoData._id, currentTodoData)
         .then(
          onSuccessLogTodo,
          onErrorLogFailure
        ).then(
          function() {
            switchList($todoHTML);
          }
        );
    });

    $bootsyTodo.append($todoHTML);
  }
});
