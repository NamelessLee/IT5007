const express = require('express');
const path = require('path');
const ejsMate = require("ejs-mate");

const app = express();

//layout for every page
app.engine('ejs',ejsMate);

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(__dirname + '/views'));
app.use(express.urlencoded({extended: true}));

app.get('/',(req,res) => {
    res.render('home');
});

app.get('/login', (req,res) => {
    res.render('login');
});

app.get('/sign-up', (req, res) => {
    res.render('sign-up');
})

app.get('/report-health', (req, res) => {
    res.render('report-health');
})

app.get('/entry', (req, res) => {
    res.render('entry');
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
});