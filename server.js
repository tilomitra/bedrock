//setup Dependencies
var express  = require('express'),
bodyParser   = require('body-parser'),
cookieParser = require('cookie-parser'),
csrf         = require('csurf'),
session      = require('express-session'),
state        = require('express-state'),
flash        = require('express-flash'),
cluster      = require('express-cluster'),
compression  = require('compression'),
hbs          = require('./lib/exphbs'),
routes       = require('./routes'),
middleware   = require('./middleware'),
config       = require('./config'),
utils        = require('./lib/utils'),
port         = (process.env.PORT || 8000);


//Comment out the line below if you want to enable cluster support.
setupServer();

//Uncomment the line below if you want to enable cluster support.
//cluster(setupServer);


function setupServer (worker) {
    var app = express(),
        server = app.listen(port, function () {
            console.log("Bedrock App is now listening on port " + server.address().port);
        }),
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


    // Flash Message Support
    app.use(flash());

    //GZip Support
    app.use(compression()); 

    // Specify the public directory.
    app.use(express.static(config.dirs.pub));

    // Uncomment this line if you are using Bower, and have a bower_components directory.
    // Before uncommenting this line, go into config/index.js and add config.dirs.bower there.
    //app.use(express.static(config.dirs.bower));

    app.use(csrf());
    app.use(function(req, res, next) {
        var token = req.csrfToken();
        res.cookie('XSRF-TOKEN', token);
        res.locals._csrf = token;
        next();
    });

    // Use the router.
    app.use(router);


    ///////////////////////////////////////////
    //              Routes                   //
    ///////////////////////////////////////////

    /////// ADD ALL YOUR ROUTES HERE  /////////

    // The exposeTemplates() method makes the Handlebars templates that are inside /shared/templates/
    // available to the client.
    router.get('/', [ middleware.exposeTemplates(), routes.render('home') ]);

    // Error handling middleware
    app.use(function(req, res, next){
        res.render('404', { status: 404, url: req.url });
    });

    app.use(function(err, req, res, next){
        res.render('500', {
            status: err.status || 500,
            error: err
        });
    });

    return server;
}

