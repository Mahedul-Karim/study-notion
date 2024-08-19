import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ children }) => {
  const modalJsx = (
    <div
      className="fixed inset-0 bg-[#000000]/[0.1] w-full h-screen z-[12] 
    backdrop-blur-[5px] flex items-center justify-center"
    >
      {children}
    </div>
  );

  return ReactDOM.createPortal(modalJsx, document.body);
};

export default Modal;
