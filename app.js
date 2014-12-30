(function() {
  'use strict';

  // Model

  var Task = Backbone.Model.extend({
    defaults: {
      title: 'do something',
      completed: false
    },
    validate: function (attrs) {
      if (_.isEmpty(attrs.title)) {
        return 'Title must not be empty';
      }
    },
    initialize: function () {
      this.on('invalid', function (model, err) {
        $('#err').html(err);
      });
    }
  });

  var Tasks = Backbone.Collection.extend({ model: Task });

  // View

  var template = _.template($('#task-template').html());

  var TaskView = Backbone.View.extend({
    tagName: 'li',
    initialize: function () {
      this.model.on('destroy', this.remove, this);
      this.model.on('change', this.render, this);
    },
    events: {
      'click .delete': 'destroy',
      'click .toggle': 'toggle'
    },
    destroy: function (e) {
      if (confirm('Are you sure?')) {
        this.model.destroy();
      }
    },
    remove: function () {
      this.$el.remove();
    },
    toggle: function (e) {
      this.model.set('completed', !this.model.get('completed'));
    },
    template: template,
    render: function () {
      var template = this.template(this.model.toJSON());
      this.$el.html(template);

      return this;
    }
  });

  var TaksksView = Backbone.View.extend({
    tagName: 'ul',
    initialize: function () {
      this.collection.on('add', this.addNew, this);
    },
    addNew: function (task) {
      var taskView = new TaskView({ model: task });
      this.$el.append(taskView.render().el);
    },
    render: function () {
      this.collection.each(function (task) {
        var taskView = new TaskView({ model: task });

        this.$el.append(taskView.render().el);
      }.bind(this));

      return this;
    }
  });

  // form

  var AddTaskView = Backbone.View.extend({
    el: '#addTask',
    events: {
      'submit': 'submit'
    },
    submit: function (e) {
      var $title = $('#title');

      e.preventDefault();

      var task = new Task();

      if (task.set({ title: $title.val(), completed: false }, { validate: true })) {
        this.collection.add(task);
      }

      $title.val('');
    }
  });


  var tasks = new Tasks([
      { title: 'task1' , completed: true},
      { title: 'task2' },
      { title: 'task3' }
  ]);

  var tasksView = new TaksksView({ collection: tasks });
  var addTaskView = new AddTaskView({ collection: tasks });

  $('#tasks').append(tasksView.render().el);

}());
