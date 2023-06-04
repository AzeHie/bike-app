import React, { PropsWithChildren, useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "./Backdrop";
import "./Modal.css";

const ModalOverlay: React.FC<
  PropsWithChildren<{ header: string; onCancel: () => void; show: boolean }>
> = (props) => {
  const { show, header, onCancel } = props;
  const modalRef = useRef(null);

  const content = (
    <div className="modal">
      <header className="modal-header">
        <h2>{header}</h2>
      </header>
      <div className="modal-content">{props.children}</div>
      <div className="modal-button">
        <button className="generic-button" onClick={onCancel}>
          CLOSE
        </button>
      </div>
    </div>
  );

  return ReactDOM.createPortal(
    show ? (
      <CSSTransition
        nodeRef={modalRef}
        in={show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <div ref={modalRef}>{content}</div>
      </CSSTransition>
    ) : null,
    document.getElementById("modal-hook") as HTMLElement
  );
};

const Modal: React.FC<
  PropsWithChildren<{ show: boolean; onCancel: () => void; header: string }>
> = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <ModalOverlay {...props} />
    </React.Fragment>
  );
};

export default Modal;