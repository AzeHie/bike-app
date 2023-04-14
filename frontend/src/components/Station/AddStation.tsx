import { useCallback, useReducer } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../shared/layout/Card";
import Input from "../../shared/layout/FormElements/Input";

import "./AddStation.css";
import { VALIDATOR_MAX, VALIDATOR_MAXLENGTH, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../shared/util/validators";

const formReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'INPUT_CHANGE':
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid},
        },
        isValid: formIsValid
      }
    default: return state;
  }
}


// Coordinates and station id added on the backend
const AddStation: React.FC = () => {
  const navigate = useNavigate();
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      name: {
        value: '',
        isValid: false
      },
      address: {
        value: '',
        isValid: false
      },
      city: {
        value: '',
        isValid:false
      }
    },
    isValid: false
  });

  const inputHandler = useCallback((id: string, value: any, isValid: boolean) => {
    dispatch({type: "INPUT_CHANGE", value: value, isValid: isValid, inputId: id})
  },[]);

  const onCancelHandler = () => {
    navigate("/stations");
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formState);
  };

  return (
    <div className="add-station-container">
      <Card>
        <form onSubmit={onSubmitHandler}>
          <Input
            id="name"
            label="Station name:"
            type="text"
            validators={[VALIDATOR_MINLENGTH(3), VALIDATOR_MAXLENGTH(20)]}
            errorText="Please add a valid station name."
            onInput={inputHandler}
          />
          <Input
            id="address"
            label="Address:"
            type="text"
            validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_MAXLENGTH(50)]}
            errorText="Please add a valid station address"
            onInput={inputHandler}
          />
          <Input
            id="city"
            label="City:"
            type="text"
            validators={[VALIDATOR_MINLENGTH(4), VALIDATOR_MAXLENGTH(50)]}
            errorText="Please add a valid city."
            onInput={inputHandler}
          />
          <div className="add-station-buttons">
            <button className="generic-button" type="submit">
              ADD STATION
            </button>
            <button
              className="generic-button"
              type="button"
              onClick={onCancelHandler}
            >
              CANCEL
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AddStation;
