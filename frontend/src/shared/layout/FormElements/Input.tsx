import { useReducer, useEffect } from "react";

import "./Input.css";
import { validate } from "../../util/validators";

const inputReducer = (state: any, action: any) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: validate(action.value, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true
      };
    default:
      return state;
  }
};

const Input: React.FC<{
  id: string;
  label: string;
  type: any;
  errorText: string;
  validators: any[];
  onInput: (id: string, value: any, isValid: boolean) => void;
}> = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
    isTouched: false
  });

  const { id, onInput } = props; // pull out some pieces of props for useEffect to avoid infinity loop or too many useEffect changes
  const { value, isValid } = inputState; // same as on previous line

  useEffect(() => {
    // onChange, send data back to component that used Input-component
    onInput(id, value, isValid);
  }, [id, onInput, value, isValid]);

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "CHANGE",
      value: e.target.value,
      validators: props.validators,
    });
  };

  const blurHandler = () => {
    dispatch({
      type: 'TOUCH'
    });
  };


  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        type={props.type}
        onChange={changeHandler}
        onBlur={blurHandler}
        value={inputState.value}
      />
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
