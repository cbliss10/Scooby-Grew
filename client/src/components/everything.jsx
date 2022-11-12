import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { io } from "socket.io-client";

export const Everything = () => {
  const [socket, setSocket] = useState();

  const [doseInfo, setDoseInfo] = useState({
    waterVolume: 5,
    doseItems: [{ name: "FloraMicro", doseRate: 7.5, pin: 5 }],
  });

  useEffect(() => {
    setSocket(io("http://192.168.1.100:3000"));
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.on("connect", () => console.log("connected"));
  }, [socket]);

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
    if (socket === null) return;
    socket.emit("dose", doseInfo);
  };

  return (
    <div className="container">
      <label>Water Volume</label>
      <input
        type="text"
        value={doseInfo.waterVolume}
        onChange={handleVolumeChange}
      />
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
