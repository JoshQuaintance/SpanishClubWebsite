const http = new XMLHttpRequest();
const url = window.location.href;

function wrongPassword() {
	let passwordIcon = $('.textbox.password .fa-lock');
	let passwordUnderline = $('#user-pass + .underline');
	let passwordCont = $('.textbox.password');
	let passwordLabel = $('.textbox.password label');

	if ($('#title-incorrect').length) {
		$('#title-incorrect').text('Password Incorrect');
	} else {
		$('<h3> Password Incorrect </h3>').attr('id', 'title-incorrect').insertAfter('#title');
	}

	passwordUnderline.addClass('incorrect');
	passwordLabel.addClass('incorrect');
	passwordIcon.addClass('incorrect');

	setTimeout(() => {
		passwordUnderline.removeClass('incorrect');
		passwordLabel.removeClass('incorrect');
		passwordIcon.removeClass('incorrect');
		passwordCont.removeClass('incorrect').removeAttr('style');
	}, 820);
	passwordCont.css({
		borderColor : 'red',
		animation   : 'shake .82s'
	});
}

function usernameWrong() {
	let usernameIcon = $('.textbox.username .fa-user');
	let usernameUnderline = $('#user-name + .underline');
	let usernameCont = $('.textbox.username');
	let usernameLabel = $('.textbox.username label');

	if ($('#title-incorrect').length) {
		$('#title-incorrect').text('Cannot Find Username');
	} else {
		$('<h3> Cannot Find Username </h3>').attr('id', 'title-incorrect').insertAfter('#title');
	}

	usernameUnderline.addClass('incorrect');
	usernameLabel.addClass('incorrect');
	usernameIcon.addClass('incorrect');

	setTimeout(() => {
		usernameUnderline.removeClass('incorrect');
		usernameLabel.removeClass('incorrect');
		usernameIcon.removeClass('incorrect');
		usernameCont.removeClass('incorrect').removeAttr('style');
	}, 820);
	usernameCont.css({
		borderColor : 'red',
		animation   : 'shake .82s'
	});
}

function loginSuccess() {
    document.cookie = "just-logged-in;";
	HomeBtn(true);
}

function Login() {
	const user = {
		name     : $('input#user-name').val(),
		password : $('input#user-pass').val()
	};
	http.open('POST', url, true);

	http.setRequestHeader('Content-Type', 'application/json');
	http.onreadystatechange = () => {
		if (http.readyState == 4 && http.status == 200) {
			if (http.responseText == 'Wrong Password') wrongPassword();
			if (http.responseText == 'Cannot find user') usernameWrong();
			if (http.responseText == 'Success') loginSuccess();
		}
	};

	http.send(JSON.stringify(user));
}

function HomeBtn(clicked) {
	let homeBtn = document.getElementById('back-btn');
	homeBtn.onclick = () => {
		let currUrl = window.location.href;
    window.location.href = currUrl.replace(/(login).*/, '');
  };
  


	if (clicked) homeBtn.click();
}

$('#signin-form').submit(e => {
	e.preventDefault();
	Login();
});

$(document).ready(() => {
	HomeBtn();
});
