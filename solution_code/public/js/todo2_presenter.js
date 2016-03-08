console.log("todo2_presenter loaded!");

/*
 * Todo constructor. This is used to "wrap" the JSON data that
 * represents a todo, and bundle with it all of the presentational
 * logic.
 */

var Todo = function(jsonTodo) {
  // Either the user passes an object, or use an empty one.
  jsonTodo || (jsonTodo = {});

  // Set an internal property *data* to represent a todo from
  // the server.
  this.data = {};
  this.data._id         = jsonTodo._id;
  this.data.task        = jsonTodo.task;
  this.data.bootsyLevel = jsonTodo.bootsyLevel;
  this.data.completed   = jsonTodo.completed;
};

/*
 * Define a template and render function for all todos.
 */

Todo.prototype.template = `
  <li id="todo-<%= _id %>" class="todo-item bootsy<%= bootsyLevel %>">
    <%= task %>
    <input type="checkbox" name="todo[completed]" <%= completed ? "checked" : "" %> />
    <span class="remove-item">X</span>
  </li>
`;
Todo.prototype.render = _.template(Todo.prototype.template);

/*
 * Define a function to generate HTML based on the data of
 * the current instance.
 */

Todo.prototype.html = function() {
  return this.render(this.data);
}

/*
 * Define a function to create a jQuery-wrapped element
 * of the instance, including all event
 * listeners!
 */
Todo.prototype.$Element = function() {
  var self = this;

  // Wrap in jQuery.
  var $element = $(this.html());

  // Create an internal reference to the element.
  this.$el = $element;

  // Add listeners…
  $element.find("input[type=checkbox]").on("change", function(evt) {
    // Toggle completed in internal data.
    self.data.completed = !self.data.completed;

    self.save().then(function() {
      self.$el.detach(); // When successful, remove self from DOM, and
                         // then re-attach elsewhere on page.
      if (self.data.completed) {
        $personalTodo.append(self.$el);
      } else {
        $bootsyTodo.append(self.$el);
      }
    });
  });
  $element.find(".remove-item").on("click", function(evt) {
    self.destroy().then(function() {
      self.$el.remove(); // When successful, remove self from DOM.
    });
  });

  return $element;
};


// Use:
//
// t = new Todo({ task: "Do housework.", bootsyLevel: 1 });
// t.$Element();
