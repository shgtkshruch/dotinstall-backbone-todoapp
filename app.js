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

  var TaskView = Backbone.View.extend({

  });

  var TaksksView = Backbone.View.extend({

  });

  var tasks = new Tasks([
      { title: 'task1' , completed: true},
      { title: 'task2' },
      { title: 'task3' }
  ]);

}());
