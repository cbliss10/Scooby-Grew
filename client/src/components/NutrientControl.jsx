import { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const NutrientControl = (props) => {
	const profiles = props.profiles;
	const executeDose = props.executeDose;

	const [selectedProfile, setSelectedProfile] = useState(null);

	const handleFieldChange = (index, fieldName, value) => {
		if (selectedProfile === null) return;
		const saveInfo = { ...selectedProfile };
		saveInfo.dosages[index][fieldName] = value;
		setSelectedProfile(saveInfo);
	};

	const GetItemRows = (stuffs) => {
		console.log(stuffs);
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

	const onChangeProfile = (e) => {
		console.log("selected profile:" + e.target.value);
		setSelectedProfile(profiles[e.target.value]);
	};

	const addNutrientItem = () => {
		if (selectedProfile === null) return;
		var saveInfo = { ...selectedProfile };
		saveInfo.dosages.push({ name: "", doseRate: 0, pin: 0 });
		setSelectedProfile(saveInfo);
	};

	const getFormOptions = () => {
		const options = [{ name: "" }, ...profiles];

		return options.map((profile, index) => (
			<option key={index} value={index - 1}>
				{profile.name}
			</option>
		));
	};

	return (
		<div className="container">
			<Form.Group>
				<Form.Label>Select Profile:</Form.Label>
				<Form.Control as="select" onChange={onChangeProfile}>
					{getFormOptions()}
				</Form.Control>
			</Form.Group>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Index</th>
						<th>Name</th>
						<th>ml/gal</th>
						<th>Pin #</th>
					</tr>
				</thead>
				<tbody>
					{selectedProfile === null
						? null
						: GetItemRows(selectedProfile.dosages)}
				</tbody>
			</Table>
			<Button onClick={addNutrientItem}>Add Nutrient Item</Button>
			<Button onClick={() => executeDose(selectedProfile.dosages)}>
				Dose!
			</Button>
		</div>
	);
};
