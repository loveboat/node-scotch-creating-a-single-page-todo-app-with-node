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

app.listen(8080, function() {
  console.log("App listening on port 8080");  
});

