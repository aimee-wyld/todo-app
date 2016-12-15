var App = Ember.Application.create({
    rootElement: "#task-list"
})

App.IndexRoute = Ember.Route.extend({
    model: function() {
        return ['task', 'tasky', 'tasktask']
    }
})

