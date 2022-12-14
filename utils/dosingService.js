const { Gpio } = require("onoff");

const pumpTuning = 0.81;
const buffer = 3000;

const ExecuteDose = async (doseInfo, waterVolume) => {
	console.log(`DoseInfo: ${doseInfo.doseRate}`);
	console.log(`WaterVolume: ${waterVolume}`);
	const itemPin = new Gpio(doseInfo.pin, "out", "none", { activeLow: true });
	const milSec = doseInfo.doseRate * pumpTuning * 1000 * waterVolume;
	console.log(`Turning on pin ${doseInfo.pin}`);
	itemPin.writeSync(1);
	await sleep(milSec);
	console.log(`Turning off pin ${doseInfo.pin}`);
	itemPin.writeSync(0);
	await sleep(buffer);
};

const sleep = (ms) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};

exports.ExecuteDose = ExecuteDose;
