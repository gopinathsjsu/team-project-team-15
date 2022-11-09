const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');

const connection = mysql.createConnection({
	host     : 'mysql-test.ch384qrfexh2.us-east-1.rds.amazonaws.com',
	user     : 'admin',
	password : 'admin_123',
    port:'3306',
    database: 'AIRLINE_SYSTEM'
});

const app = express();

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3001', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

// http://localhost:3000/auth
app.post('/api/v1/login', function(request, response) {
	// Capture the input fields
	let name = request.body.name;
	let password = request.body.password;
    let accountType = request.body.accountType;

	// Ensure the input fields exists and are not empty
    console.log("Coming to BACKEND")
	let table="Passenger_Name";
	if(accountType != "PASSENGERS"){
		table= "Employee_Name"
	}
	if (name && password && accountType) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query(`SELECT * FROM ${accountType} WHERE ${table} = ? AND password = ?`, [ name, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.name = name;
                console.log(results)
				// Redirect to home page
				response.send({'isSuccess':`Welcome back!! ${request.session.name}`, 'isLogged': true});
			} else {
				response.send({'isSuccess':'Incorrect Username and/or Password!', 'isLogged': false});
			}			
			response.end();
		});
	} else {
		response.send({'isSuccess':'Please enter Username and Password!', 'isLogged': false});
		response.end();
	}
});


app.listen(3000);