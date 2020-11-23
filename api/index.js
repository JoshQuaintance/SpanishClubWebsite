const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');

// Connect to mongoDB using mongoose
mongoose
	.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.catch(err => console.error(err));

// Create a new user schema
const userSchema = new mongoose.Schema({
	name         : { type: String, required: true },
	password     : { type: String, required: true },
	verification : { type: String, required: true },
	sessionId    : { type: String }
});

/* Middlewares */
app.use(cookieParser('Pr1vacy')); // to read cookies
app.use(cors()); // Use CORS, anyone can access the API
app.all('/', (req, res, next) => {
	// Anyone can access the API
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With');
	next();
});
app.use(express.json()); // Use JSON

// Router for /events
require('./events')(app);

// Root directory of the project
const rootDir = path.dirname(__dirname);

// Statically serve the directory to the client
app.use(express.static(path.join(rootDir, '/public')));

// Get the home path serve the index.html
app.get('/', (req, res) => {
	res.sendFile(path.join(rootDir, 'public', 'index.html'));
});

// Get the login path serve the login.html
app.get('/login', (req, res) => {
	res.sendFile(path.join(rootDir, 'public', 'login.html'));
});

// Check for post request in the /users path and
// if everything goes right, it will create a new user
app.post('/users', async (req, res) => {
	// If there is no admin perm password created, it won't let anyone make new users
	if (!process.env.ADMIN_PERM_PASS)
		return res.status(500).send('Admin Permission Password is not created yet, cannot make any users.');

	// Checks if the password given from request is valid
	if (req.body.adminPermPass !== process.env.ADMIN_PERM_PASS)
		return res
			.status(403)
			.send(
				'Admin Permission Password to create a user account given is invalid. \nPass a key named adminPermPass in the request with the correct password'
			);

	try {
		// Create a hashed password using the given password
		const hashedPass = await bcrypt.hash(req.body.password, 10);

		// Hash the hashed password as authentication
		const authVerification = await bcrypt.hash(hashedPass, 13);

		// Create a new user Object
		const user = {
			name     : req.body.name,
			password : hashedPass
		};

		// Create a User model
		const User = mongoose.model('Users', userSchema);

		// Find the user using the name from the user obj
		await User.findOne({ name: user.name }, (err, data) => {
			if (err || !data) {
				// if there is no data
				// create a new user
				const newUser = new User({
					name         : user.name,
					password     : user.password,
					verification : authVerification
				});

				// Save it in the DB
				newUser.save(err => {
					if (err) throw err;
				});
			} else {
				// if user is found, then
				// throw an error saying username taken
				throw new Error('Username taken');
			}
		});
		res.status(201).send();
	} catch (err) {
		res.status(500).send(err);
	}
});

// Check for post request in the /login path and
// authenticate the login, if everything checks out
// it will log in the user
app.post('/login', async (req, res) => {
	// Create the user model
	const User = mongoose.model('Users', userSchema);

	// Find the user using the username given from the request
	await User.findOne({ name: req.body.name }, async (err, data) => {
		if (err || !data) {
			// If there is no data found
			res.send(`Cannot find user`);
		} else {
			try {
				// Make a random hash for session id
				let randomSecret = bcrypt.hashSync('randomsecret', 3);

				// Check if the password is good
				if (await bcrypt.compare(req.body.password, data.password)) {
					// if it is,
					// create a new object
					let userInfo = {
						name     : data.name,
						password : data.password
					};

					// Get the date one month later
					let oneMonth = new Date(new Date().setMonth(new Date().getMonth() + 1));

					// Creates a session id cookie that expires in one month
					res.cookie('user_sid', JSON.stringify(randomSecret), { expires: oneMonth });

					// Creates a user info cookie that expires in one month
					res.cookie('user-info', JSON.stringify(userInfo), { express: oneMonth });

					// Respond with message
					res.send('Success');
				} else {
					res.send('Wrong Password');
				}

				// Change the session id stored inside the DB to be the new session id
				data.sessionId = randomSecret;

				// Save the changes
				data.save(err => {
					if (err) throw err;
				});
			} catch (err) {
				res.status(500).send('Something wrong with bcrypt or code');
			}
		}
	});
});

// Check for post request on /verify path and if everything
// checks out, it will verify the user logged in
app.post('/verify', async (req, res) => {
	// Create user model
	const User = mongoose.model('Users', userSchema);

	// Get the user info from the cookies
	let userInfo = JSON.parse(req.cookies['user-info']);

	// Find the user using the username from the cookies
	await User.findOne({ name: userInfo.name }, async (err, data) => {
		if (err || !data) {
			// If there is no data,
			// respond with not found
			res.send('User Not Found');
		} else {
			try {
				// Get session id from cookie
				let sessId = JSON.parse(req.cookies['user_sid']);

				// Check with bcrypt if the password from the cookie is the same from the database
				// and if the session id is the same in the database
				if ((await bcrypt.compare(userInfo.password, data.verification)) && sessId == data.sessionId) {
					// if so,
					// respond with authorized
					res.send('Authorized');
				} else {
					res.send('Not Authorized');
				}
			} catch (err) {
				res.status(500).send('Failed to compare');
			}
		}
	});
});

// Admin Dashboard
/*
 ? Before it will serve the dashboard it will authenticate if the user
 ? info in the cookies is correct with the one stored inside the database 
 ? and will also check for the session id if it matches the one in the database.
 ? Every account can only have 1 session login, so only 1 session can use 1 account.
 */
app.get('/dashboard/', async (req, res) => {
	let sessInfo = {}; // Empty object for the cookies

	// Split the headers cookies
	req.headers.cookie.split(' ').forEach(val => {
		// Split it into key and value
		let splitted = val.split('=');

		// Input the key into the object declared and the value parsed into JSON
		sessInfo[splitted[0]] = JSON.parse(decodeURIComponent(splitted[1]).replace(/;/, ''));
	});

	// Create the model
	const User = mongoose.model('Users', userSchema);
	try {
		// Find the username
		await User.findOne({ name: sessInfo['user-info'].name }, async (err, data) => {
			if (err || !data) {
				// If not found, then won't be authorized
				res.status(403).sendFile(path.join(rootDir, 'public', 'forbidden.html'));
			} else {
				if (
					// Check if the user info password is correct and check if the session id match
					(await bcrypt.compare(sessInfo['user-info'].password, data.verification)) &&
					sessInfo['user_sid'] == data.sessionId
				) {
					// Serve the dashboard

					res.sendFile(path.join(rootDir, 'public', 'dashboard.html'));
				} else {
					// If any of the check didn't pass then it will serve the forbidden file

					res.status(403).sendFile(path.join(rootDir, 'public', 'forbidden.html'));
				}
			}
		});
	} catch (err) {
		console.log(err);
	}
});

module.exports = app;
