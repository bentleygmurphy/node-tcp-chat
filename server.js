let net = require("net");

let sockets = [];

net
  .createServer(socket => {
    sockets.push(socket);

    socket.setEncoding("utf8");

    socket.on("data", data => {
      posliSpravu(socket, JSON.parse(data));
    });

    socket.on("close", () => {
      console.log(socket + " has disconnected");
      sockets.splice(sockets.indexOf(socket), 1);
    });
  })
  .listen(8888);

posliSpravu = (from, message) => {
  let msg = JSON.stringify(message) + "\n";
  sockets.forEach(incoming_socket => {
    if (incoming_socket != from) {
      incoming_socket.write(msg);
    }
  });
};
