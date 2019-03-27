$(function () {
	var socket = io();
	var chat = io.connect('http://localhost:3000/chat');

	$('form').submit(function(e){
		e.preventDefault();
		var msg = {
			username:  username,
			texte: $('#message').val()
		}
		chat.emit('chat:message', msg);
		$('#message').val('').focus();
		return false;
	});

	chat.on('connect', () => {
		chat.emit('chat:userConnect', username);
	});

	chat.on('chat:userConnected', (username) => {
		var template = $('#member-template').html();
		var member = $(template);

		member.find('strong').text(username);
		member.find('p').text(new Date().toISOString());

		$('#members-list').append(member);
	});

	chat.on('chat:receivedMessage', function(msg){

		var template = $('#message-template').html();
		var message = $(template);

		message.find('strong').text(msg.username);
		message.find('i').text(new Date().toISOString());
		message.find('p').text(msg.texte);

		$('#chat-messages').append(message);

	});
});
