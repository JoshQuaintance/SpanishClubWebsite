const http = new XMLHttpRequest();
let auth = false;
// const Calendar = require('../assets/calendar/main');

function redirect(destination) {
	let origin = window.location.href;
	if (origin.endsWith('/')) window.location.href = `${origin}${destination}`;
	else window.location.href = `${origin}/${destination}`;
}

async function checkAuth() {
	let url = window.location.href.endsWith('/') ? `${window.location.href}verify` : `${window.location.href}/verify`;

	http.open('POST', url, true);

	http.setRequestHeader('Content-Type', 'application/json');

	http.send(JSON.stringify({ intention: 'verify' }));

	http.onreadystatechange = () => {
		if (http.readyState == 4 && http.status == 200) {
			if (http.responseText == 'Authorized') auth = true;
			else auth = false;
		}
	};
}

async function HomePageLoginBtn() {
	let loginBtn = document.getElementById('log-in');
	loginBtn.onclick = () => {
		redirect('login');
	};
}

function successAlert(message) {
	let alertNotif = $(
		`<div class="alert alert-success alert-dismissible fade show login-success" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <strong>${message}</strong>
    </div>`
	);
	$('body').prepend(alertNotif);
	setTimeout(() => $('.login-success').css('top', '0'), 500);
	setTimeout(() => $('.login-success').alert('close'), 4000);
}

function loggedIn() {
	let loginBtn = document.getElementById('log-in');
	loginBtn.id = 'dashboard';

	let logoutBtn = document.getElementById('dashboard');
	logoutBtn.textContent = 'Dashboard';

	/*
    Logout Process
    */
	logoutBtn.onclick = () => redirect('dashboard');
}

$(document).ready(async () => {
	$('body').addClass('pageLoaded');
	HomePageLoginBtn();

	/* More Upcoming Events */
	// If there is more than 1 events, remove the hr from the very last element
	setTimeout(() => {
		if ($('.event-content').length > 1) {
			$('.event-content').first().find('hr').remove();
		}
	}, 10);

	// For editing content
	// document.getElementById('testing-dates').contentEditable = true;
	// document.getElementById('testing-dates').addEventListener('keydown', function(e) {
	// 	if (e.code == 'Enter') {
	// 		e.preventDefault();
	// 		this.contentEditable = false;
	// 		this.contentEditable = true;
	// 	}
	// });

	if (document.cookie.indexOf('user_sid') > -1) {
		await checkAuth();

		http.onreadystatechange = () => {
			if (http.readyState == 4 && http.status == 200) {
				if (http.responseText == 'Authorized') {
					loggedIn();
				}
			}
		};
	}

	if (document.cookie.indexOf('just-logged-in') > -1) {
		successAlert('Login Successful');
		document.cookie = 'just-logged-in; expires=Thu, 01 Jan 1970 00:00:00 UTC';
	}

	if (localStorage.getItem('just-logged-out')) {
		successAlert('Logout Successful');
		localStorage.removeItem('just-logged-out');
	}
});
