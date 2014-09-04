//setup Dependencies
var express  = require('express'),
bodyParser   = require('body-parser'),
cookieParser = require('cookie-parser'),
session      = require('express-session'),
state        = require('express-state'),
hbs          = require('./lib/exphbs'),
routes       = require('./routes'),
middleware   = require('./middleware'),
config       = require('./config'),
app          = express(),
port         = (process.env.PORT || 8000),
server       = app.listen(port, 'localhost'),
router;

//Setup Express App
state.extend(app);
app.engine(hbs.extname, hbs.engine);
app.set('view engine', hbs.extname);
app.enable('view cache');

//Uncomment this if you want strict routing (ie: /foo will not resolve to /foo/)
//app.enable('strict routing');

//Change "App" to whatever your application's name is, or leave it like this.
app.set('state namespace', 'App');

//Create an empty Data object and expose it to the client. This
//will be available on the client under App.Data.
//This is just an example, so feel free to remove this.
app.expose({}, 'Data');

if (app.get('env') === 'development') {
    app.use(middleware.logger('tiny'));
}

// Set default views directory. 
app.set('views', config.dirs.views);

router = express.Router({
    caseSensitive: app.get('case sensitive routing'),
    strict       : app.get('strict routing')
});

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Parse application/json
app.use(bodyParser.json())

// Parse cookies.
app.use(cookieParser());

// Session Handling
app.use(session({secret: 'keyboard cat', resave: true, saveUninitialized: true}));

// Specify the public directory.
app.use(express.static(config.dirs.pub));

// Uncomment this line if you are using Bower, and have a bower_components directory.
// Before uncommenting this line, go into config/index.js and add config.dirs.bower there.
//app.use(express.static(config.dirs.bower));

// Use the router.
app.use(router);


///////////////////////////////////////////
//              Routes                   //
///////////////////////////////////////////

/////// ADD ALL YOUR ROUTES HERE  /////////

// The exposeTemplates() method makes the Handlebars templates that are inside /shared/templates/
// available to the client.
router.get('/', [ middleware.exposeTemplates(), routes.render('home') ]);

// A Route for Creating a 500 Error (Useful to keep around)
router.get('/500', routes.render);

// The 404 Route (ALWAYS Keep this as the last route)
router.get('/*', function(req, res){
    throw new NotFound;
});

function NotFound(msg){
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}

console.log('Listening on http://localhost:' + port );
