const express = require('express');

const app = express();

const port = 8000;

// express layouts
const expressLayouts = require('express-ejs-layouts');

// render the layouts
app.use(expressLayouts);

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