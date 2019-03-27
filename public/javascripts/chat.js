$(function () {
	let socket = io();
	let chat = io.connect('http://localhost:3000/chat');

	$('form').submit(function(e){
		e.preventDefault();
		let msg = {
			username:  username,
			texte: $('#message').val()
		}
		chat.emit('chat:message', msg);
		$('#message').val('').focus();
		return false;
	});

	chat.on('connect', () => {
		let template = $('#member-template').html();
		let member = $(template);

		member.find('strong').text(username);
		member.find('p').text(new Date().toISOString());

		$('#members-list').append(member);
	});

	chat.on('chat:receivedMessage', function(msg){

		let template = $('#message-template').html();
		let message = $(template);

		message.find('strong').text(msg.username);
		message.find('i').text(new Date().toISOString());
		message.find('p').text(msg.texte);

		let messages = $('#chat-messages');

		messages.append(message);
		messages.scrollTop(messages[0].scrollHeight);
	});
});
