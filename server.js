//We can configure our web server
//different routes, root of the website, etc
//Starting a server and binding it to a port number
const express = require('express');
const hbs = require('hbs');
const os = require('os');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(`${__dirname}/views/partials`);
//helper takes two arguments: name of the helper and function to run
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})
hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.set('view engine', 'hbs');


app.use((req, res, next) => {
    // console.log('requests received ....');
    // setTimeout(() => {console.log('OK NOW.'); next();}, 5000);
    var now = new Date().toString();
    var log = `${now}:${req.method}:${req.url}`;
    fs.appendFileSync('server.log', `${log}\n`);
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })

app.use(express.static(`${__dirname}/public`));


//setup a handler for get request
//argument 1 is the root of the app and second one is the function of what to do
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: `Welcome to the Home Page of this website ${os.userInfo().username}`
    })
});


app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'unable to fulfill the request'
    })
});

//We are done with the get and now we have to make the app listen
app.listen(port, () => console.log('Server is up on port 3001'));