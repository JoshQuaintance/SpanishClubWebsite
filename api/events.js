const mongoose = require('mongoose');
require('dotenv').config();

mongoose
	.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.catch(err => console.error(err));

module.exports = function(app) {
	const eventSchema = new mongoose.Schema(
		{
			title     : { type: String, required: true },
			date      : { type: String, require: true },
			time      : { type: String, require: true },
			location  : { type: String, require: true },
			expire_at : { type: Date, default: Date.now, expires: 60 }
		},
		{ timestamps: true }
	);

	// Create a new event into the database
	app.post('/events', async (req, res) => {
		let exactTime;
		if (req.body.time.indexOf('PM') && req.body.time.split(' ')[0].substr(0, 2) != 12) {
			let fullTime = req.body.time.split(' ')[0].length < 5 ? `0${req.body.time}` : req.body.time;
			let hour =
				fullTime.split(' ')[0].substr(0, 2) * 1 + 12 < 10
					? `0${fullTime.split(' ')[0].substr(0, 2) * 1 + 12}`
					: fullTime.split(' ')[0].substr(0, 2) * 1 + 12;

			exactTime = `${hour}:${fullTime.split(' ')[0].substr(3, 2)}`;
		}
		let eventFinished = new Date(`${req.body.date}, ${req.body.year} ${exactTime}`);

		// Declare event model
		const Event = mongoose.model('Events', eventSchema);

		const newEvent = new Event({
			/*
            {
                title    : "title",
                date     : "Month Date",
                time     : "12:00 PM"
                location : "Location"
            }
            */
			title     : req.body.title,
			date      : req.body.date,
			time      : req.body.time,
			location  : req.body.location,
			expire_at : eventFinished
		});

		newEvent.save(err => {
			if (err) {
				res.status(500).send(err);
				console.error(err);
			} else {
				res.status(201).send('Event Created');
			}
		});
	});

	// Fetch Events from Database
	app.get('/events', async (req, res) => {
		// Declare event model
		const Events = mongoose.model('Events', eventSchema);

		await Events.find({}, (err, data) => {
			if (err) {
				res.status(500).send('Cannot Fetch Events');
				console.error(err);
			} else {
				res.status(200).send(JSON.stringify(data));
			}
		});
	});
};
