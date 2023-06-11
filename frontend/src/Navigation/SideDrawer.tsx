import React, { PropsWithChildren } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import { BsBoxArrowLeft } from "react-icons/bs";

import "./SideDrawer.css";

const SideDrawer: React.FC<PropsWithChildren<{ show: boolean; onClose: () => void }>> = (props) => {
  const content = (
    <aside className="side-drawer">
      <button className="side-drawer__button" onClick={props.onClose}><BsBoxArrowLeft size={50}></BsBoxArrowLeft></button>
      <div>{props.children}</div>
    </aside>
  );

  return ReactDOM.createPortal(
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      {content}
    </CSSTransition>,
    document.getElementById("drawer-hook") as HTMLElement
  );
};

export default SideDrawer;
