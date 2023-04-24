import ReactDOM from "react-dom";

import "./Backdrop.css";

const Backdrop: React.FC<{onClick: () => void}> = (props) => {
  
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById('backdrop-hook') as HTMLElement
  );
};

export default Backdrop;