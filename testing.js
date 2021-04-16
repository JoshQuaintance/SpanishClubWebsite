const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');

mongoose
	.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.catch(err => console.error(err));

const userSchema = new mongoose.Schema({
	name         : { type: String, required: true },
	password     : { type: String, required: true },
	verification : { type: String, required: true },
	sessionId    : { type: String }
});


//Comment
app.use(cookieParser('Pr1vacy'));
app.use(cors());
app.all('/', (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With');
	next();
});
app.use(express.json());

// For A Different File Router
require('./api/events')(app);

const rootDir = __dirname;

// Statically serve the directory to the client
app.use(express.static(path.join(rootDir, '/public')));

app.get('/', (req, res) => {
	res.sendFile(path.join(rootDir, 'public', 'index.html'));
});

app.get('/login', (req, res) => {
	res.sendFile(path.join(rootDir, 'public', 'login.html'));
});

app.post('/users', async (req, res) => {
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
		const hashedPass = await bcrypt.hash(req.body.password, 10);
		const authVerification = await bcrypt.hash(hashedPass, 13);
		const user = { name: req.body.name, password: hashedPass };
		const User = mongoose.model('Users', userSchema);

		await User.findOne({ name: user.name }, async (err, data) => {
			if (err || !data) {
				const newUser = new User({
					name         : user.name,
					password     : user.password,
					verification : authVerification
				});

				newUser.save(err => {
					if (err) throw err;
				});
			} else {
				throw new Error('Username taken');
			}
		});
		res.status(201).send();
	} catch (err) {
		res.status(500).send(err);
	}
});

// Login
app.post('/login', async (req, res) => {
	// Create model
	const User = mongoose.model('Users', userSchema);

	// Find user using it's name given from the login form
	await User.findOne({ name: req.body.name }, async (err, data) => {
		if (err || !data) {
			// If there is no data found, then respond with not find
			res.send('Cannot find user');
		} else {
			try {
				// Make a random hash for the session id
				let randomSecret = bcrypt.hashSync('randomsecret', 3);

				// Check if the password given from the form is the same with the database
				if (await bcrypt.compare(req.body.password, data.password)) {
					let userInfo = {
						name     : data.name,
						password : data.password
					};
					let oneMonth = new Date(new Date().setMonth(new Date().getMonth() + 1));

					res.cookie('user_sid', JSON.stringify(randomSecret), { expires: oneMonth });
					res.cookie('user-info', JSON.stringify(userInfo), { expires: oneMonth });
					res.send('Success');
				} else {
					res.send('Wrong Password');
				}

				data.sessionId = randomSecret;

				data.save(err => {
					if (err) throw err;
				});
			} catch (err) {
				res.send(err);
			}
		}
	});
});

// Verify Login
app.post('/verify', async (req, res) => {
	// Create Model
	const User = mongoose.model('Users', userSchema);
	// Get the user info from the cookies
	let userInfo = JSON.parse(req.cookies['user-info']);

	// Find the user with it's username
	await User.findOne({ name: userInfo.name }, async (err, data) => {
		if (err || !data) {
			// If there is no data, then respond with not found
			res.send('User Not Found');
		} else {
			try {
				// Get session id from cookie
				let sessId = JSON.parse(req.cookies['user_sid']);

				// Check with bcrpyt if the password from the cookie is the same from the database
				// and if the session id is the same in the database
				if ((await bcrypt.compare(userInfo.password, data.verification)) && sessId == data.sessionId) {
					res.send('Authorized');
				} else {
					res.send('Not Authorized');
				}
			} catch (err) {
				res.status(500).send(err);
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

app.listen(3000);
console.log('listening in localhost:3000');
