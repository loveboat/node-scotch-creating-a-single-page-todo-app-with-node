var 
  express = require('express'),
  mongoose = require('mongoose'),
  database = require('./config/database')
  
app = express();

mongoose.connect(database.url);

app.use(express.static(__dirname + '/public'));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());

// load the routes
require('./app/routes')(app);

app.listen(8080, function() {
  console.log("App listening on port 8080");  
});

