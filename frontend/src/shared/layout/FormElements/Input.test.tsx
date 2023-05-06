import { render, screen, fireEvent } from "@testing-library/react";
import Input from "./Input";
import {
  VALIDATOR_MINLENGTH
} from "../../util/validators";

const onInput = () => {};

const inputComponent = (
  <Input
    id="name"
    label="Name:"
    type="text"
    errorText="Name should be atleast 3 characters long!"
    validators={[VALIDATOR_MINLENGTH(3)]}
    onInput={onInput}
  />
);

describe("Input component", () => {
  test("should render input field", () => {
    render(inputComponent);

    const inputElement = screen.getByLabelText("Name:");
    expect(inputElement).toBeInTheDocument();
  });

  test("Should update form state when input field changed", () => {
    render(inputComponent);

    const input = screen.getByLabelText('Name:') as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Some name"} });
    expect(input.value).toBe("Some name");
  });

  test("Validation: should render error text when input is invalid and touched", () => {
    render(inputComponent)

    const input = screen.getByLabelText('Name:') as HTMLInputElement;
    fireEvent.change(input, { target: { value: "So"} });
    fireEvent.blur(input);

    const errorText = screen.getByText("Name should be atleast 3 characters long!") as HTMLInputElement;
    expect(errorText).toBeInTheDocument();
  });

  
});
