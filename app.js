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



app.get('/home',(req,res) => {
    var start = performance.now();
    res.render('home');
    var end = performance.now();
    var time = end - start;
    console.log(time);
});

app.get('/', (req,res) => {
    var start = performance.now();
    res.render('login');
    var end = performance.now();
    var time = end - start;
    console.log("Landing page load time: " + time + " ms.");

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

app.get('/close-contact', (req, res) => {
    res.render('close-contact');
})

app.get('/building-management', (req, res) => {
    res.render('building-management');
})

app.get('/admin', (req, res) => {
    res.render('admin');
})

// tutor module
// first enter tutor search from homepage sidebar
app.get('/search-tutor', (req, res) => {
    var start = performance.now();
    res.render('search-tutor');
    var end = performance.now();
    var time = end - start;
    console.log("search tutor Load Time: " + time + " ms.");
})

app.get('/display-tutor/:username', (req, res) => {
    res.render('display-tutor');
})

app.get('/become-tutor', (req, res) => {
    res.render('become-tutor');
})

app.get('/tutor-login', (req, res) => {
    res.render('tutor-login');
})

app.get('/chat', (req, res) => {
    res.render('chatbox');
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
});