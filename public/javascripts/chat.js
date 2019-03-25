$(function () {
	var socket = io('http://localhost:3000');

	$('form').submit(function(e){
		e.preventDefault();
		socket.emit('chat:message', $('#message').val());
		$('#message').val('');
		return false;
	});

	socket.on('chat:receivedMessage', function(msg){
		$('#chat').append($('<li>').text(msg));
		window.scrollTo(0, document.body.scrollHeight);
	});
});
