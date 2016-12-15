var App = Ember.Application.create({
    rootElement: ".task-list"
})

App.Router.map(function() {
    // this.route('task', { path: '/' });
})


App.ApplicationAdapter = DS.RESTAdapter.extend({
    host: 'http://localhost:9090'
})

App.ApplicationSerializer = DS.RESTSerializer.extend({
    primaryKey: '_id',
    serializeId: function(id) {
        return id.toString()
    }
})


App.Task = DS.Model.extend({
    "taskId": DS.attr(),
    "name": DS.attr(),
    "definition": DS.attr(),
    "deadline": DS.attr(),
    "complete": DS.attr()
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
    }
})

App.TaskRoute = Ember.Route.extend({
    model: function() {
        return this.store.findAll('task')
    }
})

App.IndexRoute = Ember.Route.extend({
    model: function() {
        return App.TasksModel.findAll()
    }
})

