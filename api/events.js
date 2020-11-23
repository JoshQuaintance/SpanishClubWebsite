const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose
	.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.catch(err => console.error(err));

const eventSchema = new mongoose.Schema({
	name        : { type: String, required: true },
	description : { type: String, require: true },
	date        : { type: String, require: true },
	time        : { type: String, require: true },
	location    : { type: String, require: true }
});

module.exports = function(app) {
	// Create a new event into the database
	app.post('/events', async (req, res) => {
		// Declare event model
		const Event = mongoose.model('Events', eventSchema);

		const newEvent = new Event({
			name        : req.body.name,
			description : req.body.description,
			date        : req.body.date,
			time        : req.body.time,
			location    : req.body.location
		});

		newEvent.save(err => {
			if (err) console.error(err);
		});

		res.status(201).send('Event Created');
	});

	// Fetch Events from Database
	app.get('/events', async (req, res) => {
		// Declare event model
		const Event = mongoose.model('Events', eventSchema);

		await Event.find({}, (err, data) => {
			if (err) {
				res.status(500).send('Cannot Fetch Events');
				console.error(err);
			} else {
				res.status(200).send(JSON.stringify(data));
			}
		});
	});
};
