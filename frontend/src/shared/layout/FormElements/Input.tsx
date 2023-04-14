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

  return (
    <div
      className={`form-control ${
        !inputState.isValid && "form-control--invalid"
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        type={props.type}
        onChange={changeHandler}
        value={inputState.value}
      />
      {!inputState.isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
