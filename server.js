const fs = require('fs');
const express = require('express');
const hbs = require('hbs');

const app = express();

const port = process.env.PORT || 80;

app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('GetCurrentYear', ()=> { return new Date().getFullYear()} );
hbs.registerHelper('screamIt', (someTxt)=> {return someTxt.toUpperCase() });

app.use(express.static(__dirname + '/public'));
app.use((req, res, next)=> { 
    const now = new Date().toString();
    const log = `${now} : ${req.method} ${req.url}`;  
    fs.appendFile('server.log', log + '\n', (Error)=>{
        if(Error) {
             console.log("cannot append file");
        }else {
             console.log(log);
    }});
    next();
});

app.get('/', (req, res) =>{
    res.render('home', {
        pageTitle :'Home',
        message: "Welcome To Home Page"
    });
});

app.get('/about', (req, res)=>{
    res.render('about', {
        pageTitle :'About'
    });
});


app.get('/bad', (req, res)=>{
    res.send({Error: 'Bad Request'});
});

app.listen(port, ()=> {
    console.log(`server is up and running on port ${port}...`);
});