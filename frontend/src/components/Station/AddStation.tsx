import React, { useCallback, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../shared/layout/Card";
import Input from "../../shared/layout/FormElements/Input";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/layout/ErrorModal";
import LoadingSpinner from "../../shared/layout/LoadingSpinner";
import Modal from "../../shared/layout/Modal";

import "./AddStation.css";

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

// Coordinates and station id added on the backend
const AddStation: React.FC = () => {
  const navigate = useNavigate();
  const [reqOkModal, setReqOkModal] = useState<boolean>(false);
  const [reqOkMessage, setReqOkMessage] = useState<string>("");
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      name: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      city: {
        value: "",
        isValid: false,
      },
      postalCode: {
        value: 0,
        isValid: false,
      },
    },
    isValid: false,
  });

  // since inputHandler is used in the Input-component's useEffect dependencies, it might cause infinity loop without useCallback
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
    navigate("/stations");
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await sendRequest(
        "http://localhost:5000/api/stations/add",
        "POST",
        JSON.stringify({
          name: formState.inputs.name.value,
          address: formState.inputs.address.value,
          city: formState.inputs.city.value,
          postalCode: formState.inputs.postalCode.value,
        }),
        { "Content-Type": "application/json" }
      );

      setReqOkMessage(response.message);
      setReqOkModal(true);
    } catch (err) {
      // handled in http-hook
    }
  };

  const closeModal = () => {
    setReqOkModal(false);
    setReqOkMessage("");
    navigate("/stations");
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={reqOkModal}
        onCancel={closeModal}
        header="New station added!"
      >
        <p>{reqOkMessage}</p>
      </Modal>
      <div className="add-station-container">
        <Card>
          {isLoading && <LoadingSpinner />}
          {!isLoading && (
            <form onSubmit={onSubmitHandler}>
              <Input
                id="name"
                label="Station name:"
                type="text"
                validators={[VALIDATOR_MINLENGTH(3), VALIDATOR_MAXLENGTH(50)]}
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
                id="postalCode"
                label="Postal code:"
                type="number"
                validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_MAXLENGTH(5)]}
                errorText="Please add a valid postal code"
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
          )}
        </Card>
      </div>
    </React.Fragment>
  );
};

export default AddStation;
