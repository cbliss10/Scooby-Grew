const fs = require("fs");

const settingsFilePath = "./settings.json";

const defaultSettings = {
	defaultWaterVolume: 4,
	dosingProfiles: [
		{
			name: "General Usage",
			dosages: [
				{
					name: "FloraMicro",
					doseRate: 7.5,
					pin: 4,
				},
				{
					name: "FloraGro",
					doseRate: 7.5,
					pin: 27,
				},
				{
					name: "FloraBloom",
					doseRate: 7.5,
					pin: 22,
				},
			],
		},
	],
};

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
