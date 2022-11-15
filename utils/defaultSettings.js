const defaultSettings = {
	defaultWaterVolume: 1,
	dosingProfiles: [
		{
			name: "Seedling/Clone",
			dosages: [
				{
					name: "FloraMicro",
					doseRate: 2,
					pin: 4,
				},
				{
					name: "FloraGro",
					doseRate: 2,
					pin: 27,
				},
				{
					name: "FloraBloom",
					doseRate: 2,
					pin: 22,
				},
			],
		},
		{
			name: "Early Growth 1",
			dosages: [
				{
					name: "FloraMicro",
					doseRate: 4.2,
					pin: 4,
				},
				{
					name: "FloraGro",
					doseRate: 3.8,
					pin: 27,
				},
				{
					name: "FloraBloom",
					doseRate: 3.0,
					pin: 22,
				},
			],
		},
		{
			name: "Early Growth 2",
			dosages: [
				{
					name: "FloraMicro",
					doseRate: 5.6,
					pin: 4,
				},
				{
					name: "FloraGro",
					doseRate: 5.2,
					pin: 27,
				},
				{
					name: "FloraBloom",
					doseRate: 3.8,
					pin: 22,
				},
			],
		},
		{
			name: "Late Growth",
			dosages: [
				{
					name: "FloraMicro",
					doseRate: 6.8,
					pin: 4,
				},
				{
					name: "FloraGro",
					doseRate: 6.4,
					pin: 27,
				},
				{
					name: "FloraBloom",
					doseRate: 4.8,
					pin: 22,
				},
			],
		},
	],
};

exports.defaultSettings = defaultSettings;
