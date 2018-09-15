var express = require('express');
var bodyParser = require('body-parser');    // parameter : npm 설치 때 쓴 이름
var fs = require('fs');
var app = express();
app.use(bodyParser.urlencoded({extended : false}));
app.locals.pretty = true;       // jade 줄바꿈
app.set('view engine', 'jade');
app.set('views', './views_file');
app.get('/topic/new', function(req, res) {
    // res.send('Hi');
    res.render('new');
});
app.get('/topic', function(req, res) {
    fs.readdir('data', function(err, files) {
        if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        res.render('view', {topics : files});
    });
});
app.get('/topic/:id', function(req, res) {
    var id = req.params.id;
    fs.readdir('data', function(err, files) {
        if(err) {
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        fs.readFile('data/' + id, 'utf8', function(err, data) {
            if(err) {
                console.log(err);
                res.status(500).send('Internal Server Error');
            }
            res.render('view', {topics : files, title : id, description : data});
        });
    });
});
app.post('/topic', function(req, res) {
    var title = req.body.title;
    var description = req.body.description;
    fs.writeFile('data/' + title, description, function(err) {
        if(err) {
            res.status(500).send('Internal Server Error');
        }
        res.send('Success');
    });
});

app.listen(3000, function() {
    console.log('Connected, 3000 port!');
});