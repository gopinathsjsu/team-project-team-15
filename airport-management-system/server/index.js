import express from "express";
import db from "./config/database.js";
import flightRoutes from "./routes/index.js";
import cors from "cors";
import cron from "node-cron";
import mysql from "mysql";
import session  from "express-session";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));


const connection = mysql.createConnection({
	host     : 'mysql202.cyykoabfoj9g.us-east-1.rds.amazonaws.com',
	user     : 'admin',
	password : 'admin202',
    port:'3306',
    database: 'AIRLINE_SYSTEM'
});

const app = express();

try {
    await db.authenticate();
    console.log('Database connected...');
} catch (error) {
    console.error('Connection error:', error);
}


cron.schedule(' * * * * *', () => {
  console.log('running a task every minute');
});

global.db = db;
app.use(cors());
app.use(express.json());
app.use('/flights', flightRoutes);
app.listen(5001, () => console.log('Server running at port 5001'));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));
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
	let pass="PASSENGER_PASSWORD"
	if(accountType != "PASSENGERS"){
		table= "EMPLOYEE_NAME"
		pass="EMPLOYEE_PASSWORD"
	}
	if (name && password && accountType) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query(`SELECT * FROM ${accountType} WHERE ${table} = ? AND ${pass} = ?`, [ name, password], function(error, results, fields) {
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