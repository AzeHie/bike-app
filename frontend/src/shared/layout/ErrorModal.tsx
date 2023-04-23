import Modal from "./Modal";

const ErrorModal: React.FC<{onClear: () => void, error: string}> = (props) => {
  return <Modal onCancel={props.onClear} header="An error occurred!" show={!!props.error}>
    <p>{props.error}</p>
    </ Modal>;
};

export default ErrorModal;
