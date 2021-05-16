const express = require('express');

// require cookie-parser to read and write cookies
const cookieParser = require('cookie-parser');

const app = express();

const port = 8000;

// express layouts
const expressLayouts = require('express-ejs-layouts');

// render the layouts
app.use(expressLayouts);

const db = require('./config/mongoose');

// Used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');





app.use(express.urlencoded());


// tell the app to use the cookie-parser
app.use(cookieParser());






// use static files
app.use(express.static('./assets'));

// extract style and scripts from sub page into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




// use ejs and set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


// middle ware to encrypt the cookies

app.use(session({
    name: 'codeial',
    // TODO change the secret before deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        Maxage: (1000 * 60 * 100)
    }
}));


// tell the app to use passport
app.use(passport.initialize());
app.use(passport.session());


// use express router

app.use('/', require('./routes'))


app.listen(port, (err) => {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);

});