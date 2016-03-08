console.log('JS loaded!');

// Using all of the below:
//   - http://api.jquery.com/jquery.ajax/
//   - http://api.jquery.com/jQuery.get/
//   - https://api.jquery.com/deferred.then/

function indexTodos() {
  return $.ajax({
    type: "GET",
    url:  "/todos"
  });
}

// indexTodos().then(
//   function(r) {
//     console.log("Success:", r);
//   },
//   function(e) {
//     console.log("Failed:", e);
//   }
// );

function showTodo(id) {
  return $.ajax({
    type: "GET",
    url:  "/todos/" + encodeURIComponent(id)
  });
}

// showTodo("56de438924102fca65a738e0").then(
//   function(r) {
//     console.log("Success:", r);
//   },
//   function(e) {
//     console.log("Failed:", e);
//   }
// );

function createTodo(todo) {
  return $.ajax({
    type: "POST",
    url:  "/todos",
    data: todo
  });
}

// createTodo({bootsyLevel: 0, task: "Clean the gutters."}).then(
//   function(r) {
//     console.log("Success:", r);
//   },
//   function(e) {
//     console.log("Failed:", e);
//   }
// );

function updateTodo(id, todo) {
  return $.ajax({
    type: "PUT",
    url:  "/todos/" + encodeURIComponent(id),
    data: todo
  });
}

// updateTodo("56de5f3f54a2182d70f99ccf", { bootsyLevel: 4 }).then(
//   function(r) {
//     console.log("Success:", r);
//   },
//   function(e) {
//     console.log("Failed:", e);
//   }
// );

function destroyTodo(id) {
  return $.ajax({
    type: "DELETE",
    url:  "/todos/" + encodeURIComponent(id)
  });
}

// destroyTodo("56de5f3f54a2182d70f99ccf").then(
//   function(r) {
//     console.log("Success:", r);
//   },
//   function(e) {
//     console.log("Failed:", e);
//   }
// );
