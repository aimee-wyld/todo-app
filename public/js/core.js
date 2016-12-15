var App = Ember.Application.create({
    rootElement: ".task-box"
})

App.TasksModel = Ember.Object.extend({

})

App.TasksModel.reopenClass({
    findAll: function() {
        var result = App.TasksModel.create({})
        $.ajax({
            url: '/tasks',
            type: 'GET',
            accepts: 'application/json',
            success: function(data) {
                result.setProperties(data)
            },
            error: function() {
                console.log('error')
            }
        })
        return result
    },
    add: function() {
        var result = App.TasksModel.create({})
        $.ajax({
            url: '/task/',
            type: 'POST',
            accepts: 'application/json',
            success: function(data) {
                result.setProperties(data)
            },
            error: function() {
                console.log('error')
            }
        })
        return result
    }
})

App.IndexRoute = Ember.Route.extend({
    model: function() {
        return App.TasksModel.findAll()
    }
})

App.IndexController = Ember.Controller.extend({
    actions: {
        add: function() {
            if ($('.newTask').val != "") {
                console.log('add task')
            }
        },
        remove: function() {
            console.log('remove task')
        },
        edit: function() {
            console.log('edit task')
        },
        confirmAdd: function() {
            console.log('confirm')
        }
    }
})
