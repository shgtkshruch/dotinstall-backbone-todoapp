(function() {
  'use strict';

  // Model

  var Task = Backbone.Model.extend({
    defaults: {
      title: 'do something',
      completed: false
    }
  });

  var Tasks = Backbone.Collection.extend({
    model: Task
  });

  // View

  var template = _.template($('#task-template').html());

  var TaskView = Backbone.View.extend({
    tagName: 'li',
    template: template,
    render: function () {
      var template = this.template(this.model.toJSON());
      this.$el.html(template);

      return this;
    }
  });

  var TaksksView = Backbone.View.extend({

  });

  var tasks = new Tasks([
      { title: 'task1' , completed: true},
      { title: 'task2' },
      { title: 'task3' }
  ]);

  var task = new Task();
  var tasksView = new TaskView({model: task});

  $('#tasks').append(tasksView.render().el);

}());
