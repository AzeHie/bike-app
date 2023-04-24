import React, { useCallback, useReducer } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../shared/layout/Card";
import Input from "../../shared/layout/FormElements/Input";
import {
  VALIDATOR_MIN,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/layout/ErrorModal";
import "./AddJourney.css";
import LoadingSpinner from "../../shared/layout/LoadingSpinner";

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
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      departureStation: {
        value: "",
        isValid: false,
      },
      departureDate: {
        value: "",
        isValid: false,
      },
      departureTime: {
        value: "",
        isValid: false,
      },
      returnStation: {
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
      distance: {
        value: null,
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

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await sendRequest(
        "http://localhost:5000/api/journeys/add",
        "POST",
        JSON.stringify({
          departureStation: formState.inputs.departureStation,
          departureDate: formState.inputs.departureDate,
          departureTime: formState.inputs.departureTime,
          returnStation: formState.inputs.returnStation,
          returnDate: formState.inputs.returnDate,
          returnTime: formState.inputs.returnTime,
          distance: formState.inputs.distance,
        }),
        { "Content-Type": "application/json" }
      );
    } catch (err) {
      // handled in http-hook
    }
    navigate("/journeys");
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <div className="add-journey__container">
        <Card>
          {isLoading && <LoadingSpinner />}
          {!isLoading && (
            <form onSubmit={onSubmitHandler} className="form-container">
              <div className="depature">
                <h2>Departure:</h2>
                <div className="station">
                  <Input
                    id="departureStation"
                    label="Station:"
                    type="text"
                    validators={[VALIDATOR_MINLENGTH(3)]}
                    errorText="Please enter the departure station."
                    onInput={inputHandler}
                  />
                </div>
                <div className="date">
                  <Input
                    id="departureDate"
                    label="Departure day:"
                    type="date"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please select the departure date."
                    onInput={inputHandler}
                  />
                </div>
                <div className="time">
                  <Input
                    id="departureTime"
                    label="Departure time:"
                    type="time"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please select the departure time."
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
                  id="distance"
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
                  ADD JOURNEY
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
          )};
        </Card>
      </div>
    </React.Fragment>
  );
};

export default AddJourney;
