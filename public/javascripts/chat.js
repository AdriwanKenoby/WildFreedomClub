$( function() {

	$('#send').click( () => {
		var msg = {
			name: $("#name").val(),
			texte:$("#message").val()
		};
		sendMessage(msg);
	});
	getMessages();
});

function addMessages(msg){
	$('#messages').append('<li><h4>' + msg.name + '</h4><p>' + msg.texte + '</p></li>');
}

function getMessages(){
	$.get('http://localhost:3000/messages', (data) => {
		data.forEach(addMessages);
	});
}

function sendMessage(msg){
	$.post('http://localhost:3000/messages', msg);
}
