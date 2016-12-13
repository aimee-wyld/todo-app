//design and build the backend of a to do application - first just routes & schema
//need to be able to add things - post to tasklist
//need to be able to get all tasks back - get to tasklist
//need to be able to get specific tasks back - get to tasklist/task number
//need to be able to remove things from the list - delete to tasklist/task number
//need to be able to modify tasks and mark as done - put to tasklist/task number

//basic schema
// {
//     "success": boolean
//     "message": messages[key],
//     "data": {}
// }

// var messages = ['post' => 'Task Added!',
//                 'getAll' => 'Here are all your tasks!',
//                 'get' => 'Here is your task!',
//                 'delete' => 'Task removed!',
//                 'put' => 'Task modified!']

//data schema if needed
// {
//      "taskId": int,
//      "name": "task name string",
//      "definition": "task definition string",
//      "complete": boolean
// }

var handlebars = require('express-handlebars')
var express = require('express')

var app = express()

app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', function(rq, rs) {
    rs.render('home')
})

//add things to task list
app.post('/task', function(rq, rs) {
    rs.json({})
})

//get everything from tasklist
app.get('/tasklist', function(rq, rs) {
    rs.json({})
})

//get specific task from tasklist
app.get('/task/:id', function(rq, rs) {
    var id = rq.params.id
    rs.json({})
})

//remove a task from the tasklist
app.delete('/task/:id', function(rq, rs) {
    var id = rq.params.id
    rs.json({})
})

//modify a task on the tasklist (mark as done)
app.put('/task/:id', function(rq, rs) {
    var id = rq.params.id
    rs.json({})
})

app.listen(9090, function() {
    console.log('Hooray it works!')
})