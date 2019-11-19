
let name = localStorage.getItem("rm_name")
let log = ""

const peer = new Peer( { //makeid(10)
  // host: 'li94-238.members.linode.com', //74.207.252.238
  // port: 9000,
  debug: 3,
});
let conn;



$('#lobbyName').text(name);

peer.on('open', function (id) {
  console.log('Initializing PeerJS: ' + id);

  $.ajax({
    method: "POST",
    url: `/api/lobbies/`,
    data: {
      id: id,
      name: name
    }
  }).then(function (res) {

    let waitForPeer = setInterval(function () {
      $.ajax({
        method: "GET",
        url: `/api/lobbies/${id}`
      }).then(function (res) {
        if (res[0].user2Id) { // Check to see if peer has connected
          clearInterval(waitForPeer)
          let newID = res[0].user2Id.split(`"`)
          console.log(newID)
          initChat(newID[1])
          
          $.ajax({
            method: 'DELETE',
            url: `api/lobbies/${id}`,
          })
        }
      })
    }, 1000)
  });

});







