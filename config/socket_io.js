const socket_io = require('socket.io');

module.exports = (server) => {

	const io = socket_io.listen(server);
	const chat = io.of('/chat');

	chat.on('connection', (socket) => {
		socket.on('chat:message', (msg) => {
	    chat.emit('chat:receivedMessage', msg);
	  });
	});
}
