function makeid(length) { // Makes a random ID for peerJS
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    localStorage.setItem("userID", result);

    return result;
}

function initChat(id) {
    conn = peer.connect(id);
    peer.on('connection', function (conn) {
        conn.on('data', function (data) {
            console.log(data);
            let $log = $("<div>")
            $log.text(data)

            if (data != "Peer Connected!") {
                $log.css('color', 'red')
            }

            $('#log').append($log);
        });
    });

    $("#send").on("click", function () {
        // on open will be launch when you successfully connect to PeerServer
        conn = peer.connect(id);
        conn.on('open', function () {
            let data = $("#message").val()
            console.log(`DATA: ${data}`)
            conn.send('Peer: ' + data);

            let $log = $("<div>")
            $log.text("You: " + data)
            $log.css('color', 'blue')
            $('#log').append($log);

            $('#message').val("")
        });
    })
}
