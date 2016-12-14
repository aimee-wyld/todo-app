var handlebars = require('express-handlebars')
var express = require('express')
var bodyParser = require('body-parser')
var mysql = require('mysql')
var MongoClient = require('mongodb').MongoClient
var assert = require('assert')

var app = express()
var url = 'mongodb://localhost:27017/tasks'

app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')
app.use(express.static('public'))
app.use(bodyParser.json())

app.get('/', function(rq, rs) {
    rs.render('home')
})

var response = {
                "success": false,
                "message": 'here is a message',
                "data": {}
            }

//get everything from tasks
app.get('/tasks', function(rq, rs) {
    MongoClient.connect(url, function(err, db) {
        console.log('Connected correctly to server')
        assert.equal(null, err)

        db.collection('tasklist').find().toArray(function(err, doc) {
            assert.equal(null, err)
            response.success = true
            response.message = 'tasks enclosed'
            response.data = doc[0].tasks
            rs.json(response)
            db.close()
            })
        })
    })

//get specific task from tasklist
app.get('/task/:id', function(rq, rs) {
    var id = parseInt(rq.params.id)
    MongoClient.connect(url, function(err, db) {
        console.log('Connected correctly to server')
        assert.equal(null, err)

        db.collection('tasklist').find({"tasks.taskId": id},
            {_id: 0, tasks: {$elemMatch: {taskId: id}}}).toArray(function(err, doc) {
            assert.equal(null, err)
            response.success = true
            response.message = 'task enclosed if exists'
            response.data = doc[0]
            rs.json(response)
            db.close()
        })
    })
})

//add new task
app.post('/task', function(rq, rs) {
    MongoClient.connect(url, function(err, db) {
        console.log('Connected correctly to server')
        assert.equal(null, err)

        db.collection('tasklist').updateOne({}, {
            $push: { "tasks":
                {
                    "taskId": rq.body.tasks.taskId,
                    "name": rq.body.tasks.name,
                    "definition": rq.body.tasks.definition,
                    "deadline": rq.body.tasks.deadline,
                    "complete": rq.body.tasks.complete
                }
            }
        },
        function(err, result) {
            assert.equal(null, err)
            response.success = true
            response.message = 'task added'
            response.data = {}
            rs.json(response)
            db.close()
        })
    })
})

//modify a task on the tasklist (mark as done etc)
app.put('/task/:id', function(rq, rs) {
    MongoClient.connect(url, function(err, db) {
        console.log('Connected correctly to server')
        assert.equal(null, err)

        db.collection("tasklist").updateOne({
                "tasks.taskId": rq.body.tasks.taskId},
            {
                $set: {
                    "tasks.$.name": rq.body.tasks.name,
                    "tasks.$.definition": rq.body.tasks.definition,
                    "tasks.$.deadline": rq.body.tasks.deadline,
                    "tasks.$.complete": rq.body.tasks.complete
                }
            }, function(err, result) {
                assert.equal(null, err)
                response.success = true
                response.message = 'task updated'
                response.data = {}
                rs.json(response)
                db.close()
        })
    })
})

//remove a task from the tasklist
app.delete('/task/:id', function(rq, rs) {
    var id = parseInt(rq.params.id)
    MongoClient.connect(url, function(err, db) {
        console.log('Connected correctly to server')
        assert.equal(null, err)

        db.collection("tasklist").updateOne({"tasks.taskId": id},
            {
                $pull: {
                    "tasks": {"taskId": id}
                }
            }, function(err, result) {
                assert.equal(null, err)
                response.success = true
                response.message = 'task deleted'
                response.data = {}
                rs.json(response)
                db.close()
            })
        })
    })

//remove all tasks from tasks
app.delete('/tasks', function(rq, rs) {
    MongoClient.connect(url, function(err, db) {
        console.log('Connected correctly to server')
        assert.equal(null, err)

        db.collection("tasklist").deleteMany({},
            function(err, result) {
                assert.equal(null, err)
                response.success = true
                response.message = 'all tasks deleted'
                response.data = {}
                rs.json(response)
                db.close()
            })
        })
    })

app.listen(9090, function() {
    console.log('Hooray it works!')
})

//mongo db installation and importation stuff
// mongod
// npm install mongodb
// mongoimport --db tasks --collection tasklist --drop --file data.json