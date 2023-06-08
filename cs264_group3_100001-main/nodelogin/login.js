const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');

const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'nodelogin'
});

const app = express();
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');
app.get('/loginadmin', function(request, response) {
    response.render('loginadmin');
});

app.get('/admin', function(request, response) {
    response.render('admin');
});
app.get('/home', function(request, response) {
    response.render('home');
});
app.get('/login', function(request, response) {
    response.render('login');
});
app.get('/register1', function(request, response){
    response.render('register1');
});
app.get('/form',  function(request, response){
    response.render('form');
});
app.get('/formslow',  function(request, response){
    response.render('formslow');
});
app.get('/quit',  function(request, response){
    response.render('quit');
});
app.get('/drop',  function(request, response){
    response.render('drop');
});
app.get('/tracking', function(request, response) {
            response.sendFile(path.join(__dirname + '/tracking.html'));
        

    });
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// http://localhost:3000/
app.get('/', function(request, response) {
	// Render login template
    response.render('login');
});

// http://localhost:3000/auth
app.post('/auth', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
    
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.post('/authadmin', function(request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
    
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM admin WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				response.redirect('/admin');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});




app.listen(3000, () => console.log("Server is Running..."));
