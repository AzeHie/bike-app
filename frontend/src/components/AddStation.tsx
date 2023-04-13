

import { useNavigate } from "react-router-dom";

import Card from "../shared/layout/Card";
import Input from "../shared/layout/FormElements/Input";

import "./AddStation.css";


// Coordinates and station id added on the backend
const AddStation: React.FC = () => {
  const navigate = useNavigate();

  const onCancelHandler = () => {
    navigate("/stations");
  }

  return (
    <div className="add-station-container">
      <Card>
        <form>
          <Input id="name" label="Station name:" type="text" />
          <Input id="address" label="Address:" type="text" />
          <Input id="city" label="City:" type="text" />
          <div className="add-station-buttons">
            <button className="generic-button" type="submit">ADD STATION</button>
            <button className="generic-button" type="button" onClick={onCancelHandler}>CANCEL</button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddStation;
