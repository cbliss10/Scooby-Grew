import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { io } from "socket.io-client";

const socket = io("http://192.168.1.100:3000");

export const Everything = () => {
	const [doseInfo, setDoseInfo] = useState({
		waterVolume: 5,
		doseItems: [{ name: "FloraMicro", doseRate: 7.5, pin: 5 }],
	});

	useEffect(() => {
		socket.on("connect", () => console.log("connected"));
		return () => {
			socket.off("connect");
		};
	}, []);

	const handleFieldChange = (index, fieldName, value) => {
		const saveInfo = { ...doseInfo };
		saveInfo.doseItems[index][fieldName] = value;
		setDoseInfo(saveInfo);
	};

	const handleVolumeChange = (e) => {
		const saveInfo = { ...doseInfo, waterVolume: e.target.value };
		setDoseInfo(saveInfo);
	};

	const GetItemRows = (stuffs) => {
		return stuffs.map((item, index) => (
			<tr key={index}>
				<td>{index}</td>
				<td>
					<input
						type="text"
						value={item.name}
						onChange={(e) => handleFieldChange(index, "name", e.target.value)}
					/>
				</td>
				<td>
					<input
						type="text"
						value={item.doseRate}
						onChange={(e) =>
							handleFieldChange(index, "doseRate", e.target.value)
						}
					/>
				</td>
				<td>
					<input
						type="text"
						value={item.pin}
						onChange={(e) => handleFieldChange(index, "pin", e.target.value)}
					/>
				</td>
			</tr>
		));
	};

	const addNutrientItem = () => {
		var saveInfo = { ...doseInfo };
		saveInfo.doseItems.push({ name: "", doseRate: 0, pin: 0 });
		setDoseInfo(saveInfo);
	};

	const submitDose = () => {
		socket.emit("dose", doseInfo);
	};

	return (
		<div className="container">
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Index</th>
						<th>Name</th>
						<th>ml/gal</th>
						<th>Pin #</th>
					</tr>
				</thead>
				<tbody>{GetItemRows(doseInfo.doseItems)}</tbody>
			</Table>
			<Button onClick={addNutrientItem}>Add Nutrient Item</Button>
			<Button onClick={submitDose}>Dose!</Button>
		</div>
	);
};
