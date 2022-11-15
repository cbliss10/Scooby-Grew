import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { WaterVolume } from "./WaterVolume";
import { NutrientControl } from "./NutrientControl";

const socket = io("http://192.168.1.100:3000");

export const Container = () => {
	const [settings, setSettings] = useState({
		defaultWaterVolume: 0,
		dosingProfiles: [],
	});

	useEffect(() => {
		socket.on("settings", (settings) => {
			setSettings(settings);
		});
		return () => {
			socket.off("settings");
		};
	}, []);

	return (
		<>
			<WaterVolume
				volume={settings.defaultWaterVolume}
				setVolume={(volume) => {
					setSettings({ ...settings, defaultWaterVolume: volume });
				}}
			/>
			<NutrientControl
				profiles={settings.dosingProfiles}
				executeDose={(doseItems) => {
					socket.emit("dose", {
						doseItems,
						waterInfo: settings.defaultWaterVolume,
					});
				}}
			/>
		</>
	);
};
