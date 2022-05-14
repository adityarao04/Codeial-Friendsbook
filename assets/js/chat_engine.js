class ChatEngine {
    constructor(chatBoxId, userEmail) {
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:7000');

        if (this.userEmail) {
            this.connectionHandler();
        }

    }


    connectionHandler() {
        this.socket.on('connect', function() {
            console.log('connection established using sockets...!');
        });
    }
}