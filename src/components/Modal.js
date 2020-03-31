import React from "react";
import styled from "styled-components";

const ModalOverlay = styled.div`
  background-color: #000000;
  opacity: 0.48;
  position: fixed;
  overflow: hidden;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;

const ModalBox = styled.div`
  animation-duration: 300ms;
  animation-delay: 150ms;
  animation-name: fadeIn;
  animation-timing-function: ease-in;
  animation-fill-mode: forwards;
  backface-visibility: hidden;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
  overflow-y: auto;
  z-index: 9999;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
  flex-direction: row;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-line-pack: stretch;
  align-content: stretch;
  position: fixed;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Modal = ({ content, onClose, showModal, children, title, subtitle }) => {
  const onCloseClick = () => {
    onClose();
    //  setModalDisplay(false);
  };

  return (
    <ModalBox
      style={{
        display: showModal ? "flex" : "none"
      }}
    >
      <ModalOverlay onClick={() => onCloseClick()} />
      <div className="d-block">
        <div className="card" style={{ width: "70vw" }}>
          <div className="card-header bg-white">
            <div className="d-flex justify-content-between align-items-center p-3">
              <div>
                <p className="mb-0">{title}</p>
                <span className="small">{subtitle}</span>
              </div>
              <button type="button" className="close" onClick={onCloseClick}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>
          <div
            style={{ maxHeight: "70vh", overflowY: "scroll" }}
            className="card-body"
          >
            {content || children}
          </div>
        </div>
      </div>
    </ModalBox> 
  );
};

export default Modal;
