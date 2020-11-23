// Events examples
/*
  {
    "title": "name of the event",
    "description": "description of the event",
    "date": "date of the event format = yyyy/mm/dd"
    "time": "time of the event format = hh:mm:ss",
    "location": "location of the event"
  }
*/

let upComingEvents = [
	{
		title       : 'event1',
		description : 'event one desc',
		date        : '2020/11/03',
		time        : '20:00',
		location    : "Tobie's room"
	},
	{
		title       : 'event1',
		description : 'We are doing ',
		date        : '2020/11/03',
		time        : '20:00',
		location    : "Tobie's room"
	}
];

function feedMainEvent() {
  let data = upComingEvents[0];
  let eventTitle = $(`[event-title="main"]`);
  let eventDate = $(`[event-date="main"]`);
  let eventTime = $(`[event-time="main"]`);
  let eventLocation = $(`[event-location="main"]`);
  let eventDesc = $(`[event-desc="main"]`);

  eventTitle.text(data.title);
  eventDate.text(data.date);
  eventTime.text(data.time);
  eventLocation.text(data.location);
  eventDesc.text(data.description);
}

function feedOverflowEvent() {
	for (let i = 1; i < upComingEvents.length; i++) {
		let eventJSON = upComingEvents[i];
		let eventTitle = $(`[event-title="${i}"]`);
		let eventDate = $(`[event-date="${i}"]`);
		let eventTime = $(`[event-time="${i}"]`);
		let eventLocation = $(`[event-location="${i}"]`);
		let eventDesc = $(`[event-desc= "${i}"]`);

		eventTitle.text(eventJSON.title);
		eventDate.text(eventJSON.date);
		eventTime.text(eventJSON.time);
		eventLocation.text(eventJSON.location);
		eventDesc.text(eventJSON.description);
	}
}


$(document).ready(() => {
  feedMainEvent();

  if (upComingEvents.length > 1) {
    feedOverflowEvent();
  } else {
    $('.event-overflow').css('display', 'none');
  }
  
  if (upComingEvents.length <= 4) $('.event-overflow-3').css('display', 'none');

  if (upComingEvents.length <= 3) $('.event-overflow-2').css('display', 'none');
});

