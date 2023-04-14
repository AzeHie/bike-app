import { useCallback, useReducer } from "react";
import { useNavigate } from "react-router-dom";

import Card from "../../shared/layout/Card";
import Input from "../../shared/layout/FormElements/Input";

import "./AddJourney.css";
import { VALIDATOR_REQUIRE } from "../../shared/util/validators";

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
          isValid: formIsValid
        }
      };
    default:
      return state;
  }
};

const AddJourney: React.FC = () => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
      depatureDate: {
        value: '',
        isValid: false
      },
      depatureTime: {
        value: '',
        isValid: false
      },
      returnDate: {
        value: '',
        isValid:false
      },
      returnTime: {
        value: '',
        isValid: false
      }
    },
    isValid: false
  });

  const inputHandler = useCallback((id: string, value: any, isValid: boolean) => {
    dispatch({type: "INPUT_CHANGE", value: value, isValid: isValid, inputId: id})
  }, []);

  const navigate = useNavigate();

  const onCancelHandler = () => {
    navigate("/");
  }


  return (
    <div className="add-journey__container">
      <Card>
        <form>
          <div className="date-and-time">
            <Input id="depatureDay" label="Depature day:" type="date" validators={[VALIDATOR_REQUIRE()]} errorText="Please select the depature date." onInput={inputHandler}/>
            <Input id="depatureTime" label="Depature time:" type="time" validators={[VALIDATOR_REQUIRE()]} errorText="Please select the depature time." onInput={inputHandler}/>
            <Input id="returnDay" label="Return day:" type="date" validators={[VALIDATOR_REQUIRE()]} errorText="Please select the return date." onInput={inputHandler}/>
            <Input id="returnTime" label="Return time:" type="time" validators={[VALIDATOR_REQUIRE()]} errorText="Please select the return time" onInput={inputHandler}/>
          </div>
          <div className="add-station-buttons">
            <button className="generic-button" type="submit" disabled={!formState.isValid}>ADD STATION</button>
            <button className="generic-button" type="button" onClick={onCancelHandler}>CANCEL</button>
          </div>
        </form>
      </Card>
    </div>
  )
};

export default AddJourney;