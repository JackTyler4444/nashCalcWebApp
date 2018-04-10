var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var router = express.Router();

var exphbs = require('express-handlebars');

var routes = require('./routes/index');
var users = require('./routes/users');
//metamask
//var invoice = require('./routes/invoice');

//metamask

// Init App
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
// Invoice

//routes not needed 
app.use('/', routes);
app.use('/', users);

//app.use('users', users);

//set javacript files 
//app.use('/', users);

router.get('/', function(req, res){ 
  //res.send(req.metaAuth.challenge);
 res.render('index');
  console.log('index');
});

// Verify
router.get('/outputs', function(req, res){
 res.render('outputs');
});

//meta mask
//app.use('/invoice', invoice);

// Set Port
app.set('port', (process.env.PORT || 3001));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));

});