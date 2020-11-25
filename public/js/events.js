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

/*
<div class="1 event-content justify-content-start text-left">
        <hr class="my-4">
            
            <div class="wrapper d-flex flex-row pl-3 pr-3">
                <div class="wrapper date mr-5 text-center d-flex flex-column align-items-center justify-content-center">
                    <h1 class="date-number" id="testing-dates">
                        12
                    </h1>
                    <h4 class="month">
                        March
                    </h4>
                </div>
                    
                <div class="wrapper info-bar time-location d-flex justify-content-between flex-column">
                    <div class="wrapper d-flex align-items-start mt-3" id="information-bar">
                        <ul>
                            <li>
                                <i class="im im-info"></i>
                            </li>
                            <li><span><strong></strong><span class="title">Sidney Spanish Club</span></span></li>
                        </ul>
                    </div>
                    <div class="wrapper d-flex align-items-start mt-3" id="information-bar">
                        <ul>
                            <li>
                                <i class="im im-location"></i>
                            </li>
                            <li><span><strong>Location</strong><span class="location">Tobie's Room - A204</span></span></li>
                        </ul>
                    </div>
                    <div class="wrapper d-flex align-items-start mt-3" id="information-bar">
                        <ul>
                            <li>
                                <i class="im im-clock"></i>
                            </li>
                            <li><span><strong>Time</strong> <span class="time">02:30 PM</span></span></li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
*/

function createNewEvent({ dateNumber, month, title, location, time }) {
	const createInfo = (icon, placeHolder, classType, text) => {
		let itemWrapper = $('<div>').addClass('wrapper d-flex align-items-start mt-3').attr('id', 'information-bar');
		let itemList = $('<ul>');
		let itemIcon = $('<li>').append($('<i>').addClass(`im im-${icon}`));
		let item = $('<li>').append(
			$('<span>').append($('<strong>').text(placeHolder)).append($('<span>').addClass(classType).text(text))
		);

		let fullItem = itemWrapper.append(itemList.append(itemIcon).append(item));

		return fullItem;
	};

	// Main Parent
	let mainParent = $('<div>').addClass('event-content justify-content-start text-left');

	let mainWrapper = $('<div>').addClass('wrapper d-flex flex-row pl-3 pr-3');

	let dateWrapper = $('<div>').addClass(
		'wrapper date mr-5 text-center d-flex flex-column align-items-center justify-content-center'
	);
	let dateNumberEl = $('<h1>').addClass('date-number').attr('id', 'testing-dates').text(dateNumber);
	let monthEl = $('<h4>').addClass('month').text(month);

	let infoWrapper = $('<div>').addClass('wrapper info-bar time-location d-flex justify-content-between flex-column');

	let titleInfo = createInfo('info', '', 'title', title);

	let locationInfo = createInfo('location', 'Location', 'location', location);

	let timeInfo = createInfo('clock', 'Time', 'time', time);

	let hr = $('<hr>').addClass('my-4');

	return mainParent
		.append(hr)
		.append(
			mainWrapper
				.append(dateWrapper.append(dateNumberEl).append(monthEl))
				.append(infoWrapper.append(titleInfo).append(locationInfo).append(timeInfo))
		);
}

// TODO Get events from Database and feed it to the browser
const getAndFeedEvents = new Promise(() => {
	let http = new XMLHttpRequest();

	const url = `${window.location.href}events`;

	http.open('GET', url, true);

	http.onreadystatechange = () => {
		if (http.readyState == 4 && http.status == 200) {
			JSON.parse(http.response).forEach(d => {
				let eventData = {
					title      : d.title,
					dateNumber : d.date.split(' ')[1],
					month      : d.date.split(' ')[0],
					location   : d.location,
					time       : d.time
				};
				$('div.container.events').append(createNewEvent(eventData));
			});
		}
	};
	http.send();
});

$(document).ready(async () => {
	await getAndFeedEvents;

	// If there is no event, append a text saying there is no upcoming event
	setTimeout(() => {
		if ($('.event-content').length < 1) {
			let noEvent = $('<h3>')
				.addClass('text-black-50 display-4 text-center')
				.text('There is currently no upcoming events');
			$('div.container.events').append(noEvent);
		}
	}, 1);
});
