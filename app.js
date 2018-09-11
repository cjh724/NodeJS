var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.locals.pretty = true;
app.set('view engine', 'jade');
app.set('views', './views');            // 생략 가능
app.use(express.static('public'));      // 정적 코드
app.use(bodyParser.urlencoded({extended : false}));

app.get('/form', function(req, res) {
    res.render('form');
});

app.get('/form_receiver', function(req, res) {
    // res.send(req.query);
    var title = req.query.title;
    var description = req.query.description;
    res.send(title + ', ' + description);
});

app.post('/form_receiver', function(req, res) {
    // res.send(req.body);
    var title = req.body.title;
    var description = req.body.description;
    res.send(title + ', ' + description);
});

app.get('/topic', function(req, res) {
    var topics = [
        'Javascript is ....',
        'Node.js is ....',
        'Express is ....'
    ];
    var output = `
        <a href="/topic?id=0">Javascript</a><br>
        <a href="/topic?id=1">Node.js</a><br>
        <a href="/topic?id=2">Express</a><br><br>
        ${topics[req.query.id]}    
    `;  // querystring:query, path(semanticurl):parmas
    res.send(output);
});

app.get('/topic/:id', function(req, res) {
    var topics = [
        'Javascript is ....',
        'Node.js is ....',
        'Express is ....'
    ];
    var output = `
        <a href="/topic/0">Javascript</a><br>
        <a href="/topic/1">Node.js</a><br>
        <a href="/topic/2">Express</a><br><br>
        ${topics[req.params.id]}
    `;    // querystring:query, path(semanticurl):parmas
    res.send(output);
});

app.get('/topic/:id/:mode', function(req, res) {
    res.send(req.params.id + ', ' + req.params.mode);
});

app.get('/template', function(req, res) {
    res.render('temp', {time : Date(), _title : 'Jade'});
});

app.get('/', function(req, res) {
    res.send('Hello home page');
});

app.get('/dynamic', function(req, res) {
    var lis = '';
    for(var i=0; i<5; i++) {
        lis = lis + '<li>coding</li>';
    }
    var time = Date();

    var output = `
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <title></title>
        </head>
        <body>
            Hello, Dynamic!
            <ul>
                ${lis}
            </ul>
            ${time}
        </body>
    
    </html>`;
    res.send(output);
});

app.get('/route', function(req, res) {
    res.send('Hello Router, <img src="/park.jpg">');
});

app.get('/login', function(req, res) {
    res.send('<h1>Login please</h1>');
});

app.listen(3000, function() {
    console.log('Connected 3000 port!');
});
