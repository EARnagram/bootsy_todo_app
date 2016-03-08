console.log("todo.js v2 presenter loaded!");

var Todo = function(jsonTodo) {
  // Either the user passes an object, or use an empty one.
  jsonTodo || (jsonTodo = {});

  // Set internal data to represent a todo from the server.
  this.data = {};
  this.data._id         = jsonTodo._id;
  this.data.task        = jsonTodo.task;
  this.data.bootsyLevel = jsonTodo.bootsyLevel;
  this.data.completed   = jsonTodo.completed;
};

// Define a template and render function for all todos.
Todo.prototype.template = `
<div id="todo-<%= _id %>" class="todo">
  <span><%= task %> <%= bootsyLevel %></span>
  <button>Who is it?</button>
</div>
`;
Todo.prototype.render = _.template(Todo.prototype.template);

// Generate HTML based on the data of the current instance.
Todo.prototype.html = function() {
  return this.render(this.data);
}

// Create a jQuery-wrapped element of the instance, including all event
// listeners.
Todo.prototype.get$Element = function() {
  var $element = $(this.html());

  // add listeners...
  $element.find("button").on("click", function(evt) {
    console.log("It's Bootsy baby!");
  });

  return $element;
};


// Use:
//
// t = new Todo({ task: "Do housework.", bootsyLevel: 1 });
// t.$element();
