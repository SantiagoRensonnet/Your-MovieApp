//Assets
import closeLogo from "../../assets/icons/modal/modal-close-icon.svg";
//Libraries
import React from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { useState } from "react";
import { useEffect } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "33rem",
    height: "10rem",
    backgroundColor: "white",
    boxShadow: "0px 0.25rem 0.25rem rgba(0, 0, 0, 0.25)",
    borderRadius: "1rem",
    fontFamily: "'Inter', sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
};
const ChoiceModal = ({
  header,
  description,
  openModal,
  closeModal,
  chooseYes,
  chooseNo,
}) => {
  let title;
  let subtitle;
  let choiceContainer;
  let yesBtn;
  let noBtn;
  let closeBtn;

  //change modal for small devices state and setup
  const [screenIsSmall, setScreenIsSmall] = useState(
    window.matchMedia("(max-width: 575.98px)").matches
  );
  useEffect(() => {
    const handler = (e) => {
      setScreenIsSmall(e.matches);
      console.log("small device", e.matches);
    };
    window
      .matchMedia("(max-width: 575.98px)")
      .addEventListener("change", handler);
  }, []);

  function afterOpenModal() {
    if (title) {
      //title style
      title.style.color = "#54595E";
      title.style.fontSize = screenIsSmall ? "1.4rem" : "1.8rem";

      title.style.fontWeight = "600";
      title.style.marginBottom = "0.5rem";
    }
    if (subtitle) {
      // subtitle style
      subtitle.style.color = "#54595E";
      subtitle.style.fontSize = screenIsSmall ? "0.9rem" : "1.2rem";
      subtitle.style.fontWeight = "400";
      subtitle.style.marginBottom = "1rem";
    }
    //yes and no buttons
    //container
    choiceContainer.style.width = "100%";
    choiceContainer.style.display = "flex";
    choiceContainer.style.justifyContent = "center";
    choiceContainer.style.fontSize = screenIsSmall ? "0.9em" : "1.2em";

    //yes
    yesBtn.style.backgroundColor = "#4F4F4F";
    yesBtn.style.color = "#F5F5F5";
    yesBtn.style.margin = "0 0.5rem";

    //no
    // noBtn.style.backgroundColor = "white";
    noBtn.style.color = "#4F4F4F";
    noBtn.style.margin = "0 0.5rem";

    //close button style
    closeBtn.style.alignSelf = "flex-end";
    closeBtn.style.backgroundColor = "#E5E5E5";
    closeBtn.style.width = screenIsSmall ? "1.2rem" : "1.5rem";
    closeBtn.style.height = screenIsSmall ? "1.2rem" : "1.5rem";
    closeBtn.style.borderRadius = "1.8rem";
    closeBtn.style.padding = "4px";
    closeBtn.style.display = "flex";
    closeBtn.style.justifyContent = "center";
    closeBtn.style.alignItems = "center";
  }
  let modalStyle = screenIsSmall
    ? {
        content: {
          ...customStyles.content,
          width: "90%",
          height: "11rem",
          textAlign: "center",
        },
      }
    : customStyles;

  return (
    <>
      <Modal
        isOpen={openModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={modalStyle}
        contentLabel="Example Modal"
      >
        <button
          ref={(_closeBtn) => (closeBtn = _closeBtn)}
          onClick={closeModal}
        >
          <img src={closeLogo} alt="close" />
        </button>
        {header && <h1 ref={(_title) => (title = _title)}>{header}</h1>}
        {description && (
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{description}</h2>
        )}
        <div ref={(_choiceContainer) => (choiceContainer = _choiceContainer)}>
          <button
            ref={(_yesBtn) => (yesBtn = _yesBtn)}
            onClick={chooseYes}
            className="yes-btn"
          >
            YES
          </button>
          <button
            ref={(_noBtn) => (noBtn = _noBtn)}
            onClick={chooseNo}
            className="no-btn"
          >
            NO
          </button>
        </div>
      </Modal>
    </>
  );
};
export default ChoiceModal;
