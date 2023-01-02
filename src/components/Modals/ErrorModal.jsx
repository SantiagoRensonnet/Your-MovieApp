//Assets
import closeLogo from "../../assets/icons/modal/modal-close-icon.svg";
import dangerLogo from "../../assets/icons/modal/modal-error-icon.svg";
//Libraries
import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};
const ErrorModal = ({ errorData, openModal, closeModal }) => {
  let title;
  let subtitle;
  let errorHeader;
  let btn;
  let icon;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function afterOpenModal() {
    if (title) {
      //title style
      title.style.color = "#54595E";
      title.style.fontSize = "1.8rem";
      title.style.fontWeight = "600";
      title.style.marginBottom = "0.5rem";
    }
    if (subtitle) {
      // subtitle style
      subtitle.style.color = "#54595E";
      subtitle.style.fontSize = "1.2rem";
      subtitle.style.fontWeight = "400";
      subtitle.style.marginBottom = "1rem";
    }
    //error header
    errorHeader.style.width = "100%";
    errorHeader.style.marginBottom = "0.5rem";
    errorHeader.style.display = "flex";
    errorHeader.style.justifyContent = "space-between";
    errorHeader.style.alignItems = "center";
    //danger logo
    icon.style.width = "1.5rem";
    icon.style.height = "1.5rem";
    //button style
    btn.style.background = "none";
    btn.style.width = "1.8rem";
    btn.style.height = "1.8rem";
    btn.style.borderRadius = "1.8rem";
    btn.style.padding = "4px";
    btn.style.display = "flex";
    btn.style.justifyContent = "center";
    btn.style.alignItems = "center";
  }

  return (
    <>
      <Modal
        isOpen={openModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div ref={(_errorHeader) => (errorHeader = _errorHeader)}>
          <img ref={(_icon) => (icon = _icon)} src={dangerLogo} alt="danger" />
          <button
            className="danger_btn"
            ref={(_btn) => (btn = _btn)}
            onClick={closeModal}
          >
            <img src={closeLogo} alt="close" />
          </button>
        </div>
        {errorData.code && (
          <h1 ref={(_title) => (title = _title)}>{errorData.code}</h1>
        )}
        {errorData.message && (
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
            {errorData.message}
          </h2>
        )}
      </Modal>
    </>
  );
};
export default ErrorModal;
