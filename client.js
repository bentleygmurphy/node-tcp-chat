let net = require("net");

let client = new net.Socket();

client.connect(8888, () => {
  console.log("Connected");
});

process.stdin.setEncoding("utf8");

process.stdin.resume();

process.stdin.on("data", data => {
  posli(data);
});

client.on("data", data => {
  console.log("Message Received: " + JSON.parse(data));
});

posli = msg => {
  client.write(JSON.stringify(msg) + "\n");
};
