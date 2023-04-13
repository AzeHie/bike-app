import "./Input.css";

const Input: React.FC<{
  id: string;
  label: string;
  type: any;
}> = (props) => {
  return (
    <div className={`form-control`}>
      <label htmlFor={props.id}>{props.label}</label>
      <input id={props.id} type={props.type}/>
    </div>
  );
};

export default Input;
