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
var mysql = require('mysql')

var connection = mysql.createConnection({
    host: '192.168.20.56',
    user: 'root',
    password: '',
    database: 'todo'
})

connection.connect()

var app = express()

app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))

app.get('/', function(rq, rs) {
    connection.query('SELECT * FROM `tasks`;', function(err, rows, fields) {
        rs.render('home', {
            content: rows
        })
    })
})

//add things to task
app.post('/task', function(rq, rs) {
    rs.json({})
})

//get everything from tasks
app.get('/tasks', function(rq, rs) {
    rs.json({})
})

//remove all tasks from tasks
app.delete('/tasks', function(rq, rs) {
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