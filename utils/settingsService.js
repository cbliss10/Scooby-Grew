const fs = require("fs");
const { defaultSettings } = require("./defaultSettings");

const settingsFilePath = "./settings.json";

const getSettings = () => {
	if (!fs.existsSync(settingsFilePath)) {
		saveSettings(defaultSettings);
	}
	return JSON.parse(fs.readFileSync(settingsFilePath, "utf8"));
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
