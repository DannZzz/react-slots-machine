import React from "react";
import { useContext } from "react";
import _Modal from "react-modal";
import { ModalContext } from "../../contexts/Modal";
import "./Modal.scss";

_Modal.setAppElement("body");

const Modal = () => {
  const { modal, toggle } = useContext(ModalContext);
  return (
    <_Modal
      className="custom-modal"
      isOpen={modal.show}
      contentLabel={""}
      onRequestClose={() => {
        toggle();
      }}
    >
      {modal.element}
    </_Modal>
  );
};

export default Modal;
