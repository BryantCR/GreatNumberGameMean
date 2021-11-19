const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(session({secret: 'root'}));

app.set('view engine', 'ejs');
app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + "/views");

status = 'none';
context = {};

app.get('/', function(req, res){
    if(req.session.ainumber == undefined){
        console.log("Starting A New Game");
        req.session.ainumber = Math.floor(Math.random()*100)+1;
        status = 'none';
        context = {status: status};
    } else {
        console.log("Existing game");
        context = {status: status};
    }
    res.render('index', context);
});

app.post('/guess', function(req, res){
    console.log(req.body);
    console.log(req.session.ainumber);
    console.log("*****************************************************");

    if(req.body.guess > req.session.ainumber){
        status = 'high';
        console.log("Status = ", status);
    }
    else if(req.body.guess < req.session.ainumber){
        status = 'low';
        console.log('low');
    }
    else if(req.body.guess == req.session.ainumber){
        status = 'win';
        console.log('win');
    }
    res.redirect('/');
});

app.post('/reset', function(req, res){
    console.log('resetting game');
    req.session.ainumber = undefined;
    res.redirect('/');
});


server.listen( 8080 );

console.log("Running in localhost at port 8080");

/*port = 7077; 
app.listen(port, function(){
    console.log("Listening on Port: ", port);
});*/