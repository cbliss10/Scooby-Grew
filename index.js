const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const path = require("node:path");
const { ExecuteDose } = require("./utils/doser");

const io = new Server(server, {
	cors: {
		origin: "http://192.168.1.100:3001",
	},
});

app.use(express.static(path.join(__dirname, "/client/build")));

// app.get("/", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

app.get("*", async (req, res) => {
	res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

io.on("connection", (socket) => {
	console.log("a user connected");
	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
	socket.on("dose", async (doseInfo) => {
		console.log(doseInfo);
		for (const doseItem of doseInfo.doseItems) {
			await ExecuteDose(doseItem, doseInfo.waterVolume);
		}
	});
});

server.listen(3000, () => {
	console.log("listening on *:3000");
});
