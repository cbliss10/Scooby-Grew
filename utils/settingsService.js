const fs = require("fs");
const { defaultSettings } = require("./defaultSettings");
const logger = require("../logger");

const settingsFilePath =
	"/home/cbliss/Documents/Projects/Scooby-Grew/settings.json";

const getSettings = () => {
	try {
		if (!fs.existsSync(settingsFilePath)) {
			saveSettings(defaultSettings);
		}
		return JSON.parse(fs.readFileSync(settingsFilePath, "utf8"));
	} catch (error) {
		logger.error(error.message);
	}
};

const saveSettings = (newSettings) => {
	try {
		fs.writeFileSync(settingsFilePath, JSON.stringify(newSettings));
	} catch (error) {
		console.log(error);
	}
};

exports.getSettings = getSettings;
exports.saveSettings = saveSettings;
