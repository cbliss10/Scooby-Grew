const { createLogger, transports, format } = require("winston");

const logger = createLogger({
	level: "debug",
	format: format.json(),
	//logger method...
	transports: [
		//new transports:
		new transports.File({
			filename: "/home/cbliss/Documents/Projects/Scooby-Grew/logs/example.log",
		}),
	],
	//...
});

module.exports = logger;
