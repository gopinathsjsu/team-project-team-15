const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');

const connection = mysql.createConnection({
	host     : 'mysql202.cyykoabfoj9g.us-east-1.rds.amazonaws.com',
	user     : 'admin',
	password : 'admin202',
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
	let table="PASSENGER_NAME";
	if(accountType != "PASSENGERS"){
		table= "EMPLOYEE_NAME"
	}
	if (name && password && accountType) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query(`SELECT * FROM ${accountType} WHERE ${table} = ? AND PASSENGER_PASSWORD = ?`, [ name, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) {response.send({'isSuccess':error.code});}
			// If the account exists
			else{
				if (results.length > 0) {
					// Authenticate the user
					request.session.loggedin = true;
					request.session.name = name;
					console.log(results)
					// Redirect to home page
					response.send({'token': Math.random(6),'isSuccess':`Welcome back!! ${request.session.name}`, 'isLogged': true});
				} else {
					response.send({'isSuccess':'Incorrect Username and/or Password!', 'isLogged': false});
				}			
				response.end();
			}
		});
	} else {
		response.send({'isSuccess':'Please enter Username and Password!', 'isLogged': false});
		response.end();
	}
});

app.post('/api/v1/register', function(request, response) {
	// Capture the input fields
	let name = request.body.name;
	let password = request.body.password;
    let accountType = request.body.accountType;
	let employeeID = request.body.employeeID;
	let email = request.body.email;
	let passport = request.body.passport;

	// Ensure the input fields exists and are not empty
    console.log("Coming to BACKEND")
	let table="PASSENGER_NAME";
	let employee='';
	if(accountType != "PASSENGERS"){
		table= "EMPLOYEE_NAME";
		employee="EMPLOYEE_ID"
	}
	if (name && password && accountType && email && passport) {
		if(employee== ''){
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query(`INSERT INTO ${accountType}(${table}, PASSENGER_PASSWORD, PASSENGER_EMAIL, PASSENGER_PASSPORT) VALUES (?,?,?,?)`, [ name,password, email, passport], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) {response.send({'isSuccess':error.code,'isCreated': false});}
			// If the account exists
			else{
					// Authenticate the user
					request.session.loggedin = true;
					request.session.name = name;
					console.log(results)
					// Redirect to home page
					response.send({'token': Math.random(6),'isSuccess':`Welcome back!! ${request.session.name}`, 'isCreated': true});	
					response.end();
			}
		});
		}
		else{
			connection.query(`INSERT INTO ${accountType}(${table}, EMPLOYEE_PASSWORD, EMPLOYEE_EMAIL, ${employee}, EMPLOYEE_PASSPORT) VALUES (?,?,?, ?)`, [ name,password, email, employeeID, passport], function(error, results, fields) {
				// If there is an issue with the query, output the error
				if (error) {response.send({'isSuccess':error.code, 'isCreated': false});}
				// If the account exists
				else{
						// Authenticate the user
						request.session.loggedin = true;
						request.session.name = name;
						console.log(results)
						// Redirect to home page
						response.send({'token': Math.random(6),'isSuccess':`Welcome back!! ${request.session.name}`, 'isCreated': true});		
						response.end();
				}
			});
		}
	} else {
		response.send({'isSuccess':'Please enter all the fields!', 'isCreated': false});
		response.end();
	}
});

app.post('/api/v1/logout', function(request, response) {
	response.send({'isLogged': false});
	
});


app.listen(3000);