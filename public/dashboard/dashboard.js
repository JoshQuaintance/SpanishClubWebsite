const http = new XMLHttpRequest();
const url = window.location.href;

function toggleWindow(elem) {
	$('.content .cont.active').toggleClass('active');
	$(`.content .cont.${elem.getAttribute('item-content')}`).toggleClass('active');
}

$(document).ready(() => {
	// Load whichever part is active
	$('.sidebar-item').on('click', function() {
		$('.sidebar-item.active').toggleClass('active');
		$(this).toggleClass('active');
		toggleWindow(this);
	});

	// Sidebar Username
	const cookie = decodeURIComponent(document.cookie);
	let user = cookie.substring(cookie.indexOf('user-info'), cookie.indexOf(';', cookie.indexOf('user-info')));
	let username = JSON.parse(user.substring(user.indexOf('=') + 1)).name;
	$('.sidebar-username').text(username || 'user');

	$('#sidebarCollapse').on('click', () => {
		$('#sidebar').toggleClass('active');
		$('#sidebarCollapse').toggleClass('closed');
		$('.sidebar-username').text() == 'dash'
			? $('.sidebar-username').text(username)
			: $('.sidebar-username').text('dash');
	});

	$('.sidebar-header').on('click', () => {
		$('#sidebar').toggleClass('active');
		$('#sidebarCollapse').toggleClass('closed');
		$('.sidebar-username').text() == 'dash'
			? $('.sidebar-username').text(username)
			: $('.sidebar-username').text('dash');
	});

	// 1. Home Button to go back home
	$('#homeBtn').on('click', () => {
		window.location.href = window.location.href.replace(/(dashboard).*/, '');
	});
	// 2. Officers
});

/*
<div class="container event-overflow">
        <div class="mbr-section-head">
            <h4 class="mbr-section-title mbr-fonts-style align-center mb-0 display-2"><strong>Other Upcoming Events</strong></h4>
            <h5 class="mbr-section-subtitle mbr-fonts-style align-center mb-0 mt-2 display-5">&nbsp;</h5>
        </div>
        <div class="row mt-4 event-overflow-container">
            <div class="item features-image сol-12 col-md-6 col-lg-4 event-overflow-1">
                <div class="item-wrapper">
                    <div class="item-img">
                        <img src="assets/images/product5.jpg" alt="" event-img="1">
                    </div>
                    <div class="item-content">
                        <h5 class="item-title mbr-fonts-style display-5" event-title="1">Spanish Club Meeting</h5>
                        <h6 class="item-subtitle mbr-fonts-style mt-1 display-7">
                          <strong>
                            <em event-date="1">10-10-2025 </em>| <em event-time="1">Time</em>
                          </strong>
                        </h6>
                        <h6 class="item-subtitle mbr-fonts-style mt-1 display-7">
                          <strong><em event-location="1">Location: Tobie's Place</em></strong>
                        </h6>
                        <p class="mbr-text mbr-fonts-style mt-3 display-7" event-desc="1">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                </div>
            </div>
            <div class="item features-image сol-12 col-md-6 col-lg-4 event-overflow-2">
              <div class="item-wrapper">
                  <div class="item-img">
                      <img src="assets/images/product5.jpg" alt="" event-img="2">
                  </div>
                  <div class="item-content">
                      <h5 class="item-title mbr-fonts-style display-5" event-title="2">Spanish Club Meeting 2</h5>
                      <h6 class="item-subtitle mbr-fonts-style mt-1 display-7">
                        <strong>
                          <em event-date="2">10-10-2025 </em>| <em event-time="2">Time</em>
                        </strong>
                      </h6>
                      <h6 class="item-subtitle mbr-fonts-style mt-1 display-7">
                        <strong><em event-location="2">Location: Tobie's Place</em></strong>
                      </h6>
                      <p class="mbr-text mbr-fonts-style mt-3 display-7" event-desc="2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  </div>
              </div>
            </div>
            <div class="item features-image сol-12 col-md-6 col-lg-4 event-overflow-3">
              <div class="item-wrapper">
                <div class="item-img">
                    <img src="assets/images/product5.jpg" alt="" event-img="3">
                </div>
                <div class="item-content">
                    <h5 class="item-title mbr-fonts-style display-5" event-title="3">Spanish Club Meeting 3</h5>
                    <h6 class="item-subtitle mbr-fonts-style mt-1 display-7">
                      <strong>
                        <em event-date="3">10-10-2025 </em>| <em event-time="3">Time</em>
                      </strong>
                    </h6>
                    <h6 class="item-subtitle mbr-fonts-style mt-1 display-7">
                      <strong><em event-location="3">Location: Tobie's Place</em></strong>
                    </h6>
                    <p class="mbr-text mbr-fonts-style mt-3 display-7" event-desc="3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
              </div>
            </div>

        </div>
    </div>
    */
