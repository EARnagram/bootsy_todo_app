console.log("todo.js v2 ajax loaded!");


var Todo = function(jsonTodo) {
  // var self = this;
  // Object.keys(jsonTodo).forEach(function(key) {
  //   self[key] = jsonTodo[key];
  // });
  jsonTodo || (jsonTodo = {});
  this._id         = jsonTodo._id;
  this.task        = jsonTodo.task;
  this.bootsyLevel = jsonTodo.bootsyLevel;
};

// Add index (ie, all) static (ie, class method) to the Todo constructor
Todo.all = function() {
  return $.ajax({
    type: "GET",
    url:  "/api/todos"
  }).then(
    function(jsonTodos) {
      return jsonTodos.map(function(jsonTodo) {
        return new Todo(jsonTodo);
      });
    },
    function(e) {
      console.log("Failed:", e);
    }
  );
}

// Todo.all().then(function(todos) {
//   console.log(todos);
// });

// Add show (ie, find) static (ie, class method) to the Todo constructor
Todo.find = function(id) {
  return $.ajax({
    type: "GET",
    url:  "/api/todos/" + encodeURIComponent(id)
  }).then(
    function(jsonTodo) {
      return new Todo(jsonTodo);
    },
    function(e) {
      console.log("Failed:", e);
    }
  );
}

// Todo.find("56de5f3f54a2182d70f99cd0").then(function(todo) {
//   console.log(todo);
// });

// Add a save (ie create OR update) method to every Todo instance

Todo.prototype.save = function() {
  // if _id doesn't exist, then create, otherwise update!
  var promise;

  if (!this.data._id) {
    console.log(JSON.stringify(this))
    promise = $.ajax({
      type: "POST",
      url:  "/api/todos",
      data: JSON.stringify(this.data), // pass the current state of this instance
      contentType: "application/json"
    });
  } else {
    promise = $.ajax({
      type: "PUT",
      url:  "/api/todos/" + encodeURIComponent(self._id),
      data: JSON.stringify(this.data), // pass the current state of this instance
      contentType: "application/json"
    });
  }

  return promise.then(
    function(r) {
      console.log("Success:", r);
    },
    function(e) {
      console.log("Failed:", e);
    }
  );
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
    url:  "/api/todos/" + encodeURIComponent(id),
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
    url:  "/api/todos/" + encodeURIComponent(id)
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
