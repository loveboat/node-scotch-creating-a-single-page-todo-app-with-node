var Todo = require('./models/todo');

// expose the routes to our app with module.exports
module.exports = function(app) {

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
  
};