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

app.use(express.urlencoded());


// tell the app to use the cookie-parser
app.use(cookieParser());






// use static files
app.use(express.static('./assets'));

// extract style and scripts from sub page into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// use express router

app.use('/', require('./routes'))


// use ejs and set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.listen(port, (err) => {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);

});