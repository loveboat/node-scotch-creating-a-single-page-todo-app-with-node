var 
  express = require('express'),
  mongoose = require('mongoose');
  
app = express();

mongoose.connect('mongodb://localhost:27017/single-page-todo');

app.use(express.static(__dirname + '/public'));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

// define model
var Todo = mongoose.model('Todo', {
  text : String
});



// API routes

// get all todos
app.get('/api/todos', function(req, res) {

  Todo.find(function(err, todos) {

    if (err)
      res.send(err);

    res.json(todos); // will return all todos in JSON format
  });
});

// create todo and send back all todos after creation
app.post('/api/todos', function(req, res) {

  Todo.create({
    text : req.body.text,
    done : false
  }, function(err, todo) {
    if (err)
      res.send(err);

    // get and return all the todos after you create one
    Todo.find(function(err, todos) {
      if (err)
        res.send(err)
      res.json(todos);
    });
  });
});

// delete a todo
app.delete('/api/todos/:todo_id', function(req, res) {

  Todo.remove({
    _id : req.params.todo_id
  }, function(err, todo) {
    if (err)
      res.send(err);

    // get and return all the todos after you delete one
    Todo.find(function(err, todos) {
      if (err)
        res.send(err);
      res.json(todos);
    });
  });
});



// application routes
app.get('*', function(req, res) {
  res.sendfile('.public/index.html'); // load the single view (angular will take it from here)
});



app.listen(8080, function() {
  console.log("App listening on port 8080");  
});

