import { useCallback, useReducer } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../shared/layout/Card";
import Input from "../../shared/layout/FormElements/Input";

import "./AddJourney.css";
import {
  VALIDATOR_MIN,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

const formReducer = (state: any, action: any) => {
  switch (action.type) {
    case "INPUT_CHANGE":
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
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    default:
      return state;
  }
};

const AddJourney: React.FC = () => {
  const navigate = useNavigate();
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      depatureDate: {
        value: "",
        isValid: false,
      },
      depatureTime: {
        value: "",
        isValid: false,
      },
      returnDate: {
        value: "",
        isValid: false,
      },
      returnTime: {
        value: "",
        isValid: false,
      },
    },
    isValid: false,
  });

  const inputHandler = useCallback(
    (id: string, value: any, isValid: boolean) => {
      dispatch({
        type: "INPUT_CHANGE",
        value: value,
        isValid: isValid,
        inputId: id,
      });
    },
    []
  );

  const onCancelHandler = () => {
    navigate("/");
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    console.log(formState);
  };

  return (
    <div className="add-journey__container">
      <Card>
        <form onSubmit={onSubmitHandler} className="form-container">
          <div className="depature">
            <h2>Depature:</h2>
            <div className="station">
              <Input
                id="depatureStation"
                label="Station:"
                type="text"
                validators={[VALIDATOR_MINLENGTH(3)]}
                errorText="Please enter the depature station."
                onInput={inputHandler}
              />
            </div>
            <div className="date">
              <Input
                id="depatureDate"
                label="Depature day:"
                type="date"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please select the depature date."
                onInput={inputHandler}
              />
            </div>
            <div className="time">
              <Input
                id="depatureTime"
                label="Depature time:"
                type="time"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please select the depature time."
                onInput={inputHandler}
              />
            </div>
          </div>
          <div className="return">
            <h2>Return:</h2>
            <div className="station">
              <Input
                id="returnStation"
                label="Station:"
                type="text"
                validators={[VALIDATOR_MINLENGTH(3)]}
                errorText="Please enter the return station."
                onInput={inputHandler}
              />
            </div>
            <div className="date">
              <Input
                id="returnDate"
                label="Return day:"
                type="date"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please select the return date."
                onInput={inputHandler}
              />
            </div>
            <div className="time">
              <Input
                id="returnTime"
                label="Return time:"
                type="time"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please select the return time"
                onInput={inputHandler}
              />
            </div>
          </div>
          <div className="distance">
            <Input
              id="coveredDistance"
              label="Covered distance (m):"
              type="number"
              validators={[VALIDATOR_MIN(10)]}
              errorText="Please enter covered distance (min. 10 meters)."
              onInput={inputHandler}
            />
          </div>
          <div className="add-journey__buttons">
            <button
              className="generic-button"
              type="submit"
              disabled={!formState.isValid}
            >
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

export default AddJourney;
