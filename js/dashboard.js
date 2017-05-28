require.config({
	baseUrl: window.location.pathname,
	paths: {
		'jquery': "/bower_components/jquery/dist/jquery.min"
	}
});

require(['jquery'], function ($) {
	$(function() {

var notifications = $("#notifications");
var main = $("main");

var addGroup = function(title, tiles) {
	if (!title || typeof title !== 'string')
		return;

	var container = $('<section>').addClass('container');
	var header = $('<h1>').text(title);

	container.append(header).appendTo(main);
	console.log('Added group "' + title + '"');

	// Add tiles if needed
	// addTilesToGroup(container, tiles);
	
	return container;
}

var fa = function (classes) {
	return $('<i>').addClass('fa ' + classes).attr('aria-hidden', 'true');
}

var notifyIcons = {
	'alert': 'fa-exclamation-triangle',
	'info': 'fa-info-circle',
	'refresh': 'fa-refresh fa-spin'
}

var notify = function(text, type, time, timeout) {
	if (!text || typeof text !== 'string' || !type || typeof type !== 'string')
		return;

	var container = $('<header>').addClass('notification ' + type);
	var content = $('<span>').attr('id', 'content').append(jQuery.parseHTML(text));
	container.append(fa(notifyIcons[type]));
	container.append(content);
	if (time && typeof time === 'string') {
		var timeContainer = $('<time>').text('(' + time + ')');
		container.append(timeContainer);
	}
	
	container.appendTo(notifications).hide().slideDown(200);
	console.log("[notify] " + text);

	if (timeout && typeof timeout === 'number') {
		setTimeout(function() {
			hideNotify(container);
		}, timeout);
	}

	return container;
}

var hideNotify = function (container) {
	if (!container)
		return;

	container.slideUp(200, function() {
		container.remove();
	});
}

addGroup('General statistics');
addGroup('Pad types');

// Menu bindings
$('nav > a').on('click', function (event) {
	event.preventDefault();

	var link = $(event.target).closest('a[href]'); // in case we click on the fa icon
	if (link.attr('href') === '#refresh') {
		notify("Refreshing...", 'refresh', '0%', 1000);
	}
});

// Hide the loading screen
$('#loading').fadeOut(300);

	});

	// In case of trouble, dont load forever
	window.onerror = function() {
		$('#loading > span').text('Error');
		$('#loading > .fa').removeClass('fa-spin fa-circle-o-notch').addClass('fa-exclamation-circle');

		$('<span>').attr('id', 'error')
		.text('Please check the console for details')
		.appendTo('#loading');
	};
});