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
	if (typeof title !== 'string')
		return;

	var container = $('<section>', { 'class': 'container' });
	var header = $('<h1>', { 'text': title });

	container.append(header).appendTo(main);
	console.log('Added group "' + title + '"');

	// Add tiles if needed
	// addTilesToGroup(container, tiles);
	
	return container;
}

var fa = function (classes) {
	return $('<i>', {
		'class': 'fa ' + classes,
		'aria-hidden': 'true'
	});
}

var notifyIcons = {
	'alert': 'fa-exclamation-triangle',
	'info': 'fa-info-circle',
	'refresh': 'fa-refresh fa-spin'
}

var notify = function(text, type, time, timeout) {
	if (typeof text !== 'string' || typeof type !== 'string')
		return;

	var container = $('<header>', { 'class': 'notification ' + type });
	var content = $('<span>', {
		'id': 'content',
		'html': text
	});
	container.append(fa(notifyIcons[type]));
	container.append(content);
	if (typeof time === 'string') {
		var timeContainer = $('<time>', { 'text': '(' + time + ')' });
		container.append(timeContainer);
	}

	container.appendTo(notifications).hide().slideDown(200, function() {
		if (typeof timeout === 'number') {
			setTimeout(function() {
				hideNotify(container);
			}, timeout);
		}
	});
	console.log("[notify] " + text);

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
	var href = link.attr('href');

	if (href === '#refresh') {
		notify("Refreshing...", 'refresh', '0%', 0);
	} else if (href === '#settings') {
		notify("Coming soon!", 'info', null, 1000);
	}
});

// Update version information
$.ajax('/version').done(function (data) {
	if (typeof data !== 'object')
		return;

	if (typeof data.version !== 'string' || typeof data.node !== 'string')
		return;

	$('footer > #version').text(data.version);
	$('footer > #node').text(data.node);
});

// Hide the loading screen
$('#loading').fadeOut(300);

	});

	// In case of trouble, dont load forever
	window.onerror = function() {
		$('#loading > span').text('Error');
		$('#loading > .fa').removeClass('fa-spin fa-circle-o-notch').addClass('fa-exclamation-circle');

		$('<span>', {
			'id': 'error',
			'text': 'Please check the console for details'
		}).appendTo('#loading');
	};
});
