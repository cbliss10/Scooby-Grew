const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const path = require("node:path");
const { ExecuteDose } = require("./utils/dosingService");
const { getSettings, saveSettings } = require("./utils/settingsService");
const logger = require("./logger");

logger.info(process.env.NODE_PORT);
logger.info(process.env.NODE_ENV);
const port = process.env.NODE_PORT || 3000;

const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
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
	logger.log("info", "a user connected");
	socket.on("disconnect", () => {
		console.log("user disconnected");
	});
	socket.on("dose", async (doseInfo) => {
		console.log(doseInfo);
		for (const doseItem of doseInfo.doseItems) {
			await ExecuteDose(doseItem, doseInfo.waterInfo);
		}
	});
	socket.emit("settings", getSettings());
	socket.on("save-settings", (settings) => {
		saveSettings(settings);
	});
});

server.listen(port, () => {
	console.log(`listening on *:${port}`);
});
