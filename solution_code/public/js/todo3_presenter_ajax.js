console.log("todo3_presenter_ajax loaded!");

/*
 * Add index (ie, all) static (ie, class method) to the
 * Todo constructor.
 */

Todo.all = function() {
  return indexTodos().then(
    function(jsonTodos) {
      return jsonTodos.map(function(jsonTodo) {
        return new Todo(jsonTodo);
      });
    },
    function(e) { console.log("Failed:", e); }
  );
}

// Use:
//
// Todo.all().then(function(todos) {
//   console.log(todos);
// });

/*
 * Add show (ie, find) static (ie, class method) to the
 * Todo constructor.
 */

Todo.find = function(id) {
  return $.ajax({
    type: "GET",
    url:  "/api/todos/" + encodeURIComponent(id)
  }).then(
    function(jsonTodo) {
      return new Todo(jsonTodo);
    },
    function(e) { console.log("Failed:", e); }
  );
}

// Use:
//
// Todo.find("56de5f3f54a2182d70f99cd0").then(function(todo) {
//   console.log(todo);
// });

/*
 * Add a save (ie create OR update) method to every Todo instance,
 * and a destroy as well.
 */

Todo.prototype.save = function() {
  var promise,
      self = this;

  // If _id doesn't exist then *create*, otherwise *update*!
  if (!this.data._id) {
    promise = createTodo(this.data); // Pass the data of this instance.
  } else {
    promise = updateTodo(this.data._id, this.data);
  }

  return promise.then(
    function(data) {
      console.log("Success:", data);
      self.data = data;              // Ensure internal data matches
    },                               // server; can't use "this" bc its
                                     // inside of another function.
    function(e) { console.log("Failed:", e); }
  );
}

Todo.prototype.destroy = function() {
  var self = this;

  return destroyTodo(this.data._id).then(
    function(s) {
      console.log("Success:", s);
      self.data._id = undefined; // Clear out the server id for the todo.
    },
    function(e) { console.log("Failed:",  e); }
  );
}

// Use:
//
// t = new Todo({task: "Testing baby", bootsyLevel: 2});
// t.save();                // Create
// t.data.bootsyLevel = 0;
// t.save();                // Update
// t.destroy();             // Destroy
