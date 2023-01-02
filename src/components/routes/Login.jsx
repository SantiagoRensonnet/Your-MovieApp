//Libraries
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import MsgModal from "../Modals/MsgModal";
import Modal from "react-modal";

//Styles
import "../../css/routes/Login.css";

Modal.setAppElement("#root");

const generateRandomToken = () => {
  var temp = "0b";
  for (let i = 0; i < 256; i++) {
    temp += Math.round(Math.random());
  }

  const randomNum = BigInt(temp);
  const randomNumStr = randomNum.toString();
  return randomNumStr;
};

export default function Login({ token, updateToken, updateUserName }) {
  //Modal setup
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  function openModal() {
    setModalIsOpen(true);
  }
  function closeModal() {
    setModalIsOpen(false);
  }

  const navigate = useNavigate();

  //Event Handlers
  //Submit
  const submitHandler = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const userName = event.target.userName.value;

    var regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    var regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{3,}$/;

    // const token = JSON.parse(localStorage.getItem("token")) || "";
    //user-side validations
    if (email === "" || password === "" || userName === "") {
      setModalMsg("These Fields Cannot Be Empty");
      openModal();
      return;
    }
    //test regular expression with email -> false means that email doesn't pass the test
    if (email !== "" && regexEmail.test(email) === false) {
      setModalMsg("Invalid Email Address");
      openModal();

      return;
    }
    //test regular expression with password -> false means that password doesn't pass the test
    if (email !== "" && regexPassword.test(password) === false) {
      setModalMsg(
        "Password must contain at least 3 characters, 1 uppercase, 1 lowercase and 1 number"
      );
      openModal();

      return;
    }

    axios
      .post("https://jsonplaceholder.typicode.com/users", {
        userName,
        email,
        password,
      })
      .then((res) => {
        updateToken(generateRandomToken());
        updateUserName(res.data.userName);
      })
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.log(error.code, error.message));
  };

  //redirect to "listado" if token is already saved in local storage (keep open feature)
  useEffect(() => {
    if (token) {
      navigate("/listado");
    }
  });

  return (
    <div className="login card">
      <MsgModal
        description={modalMsg}
        openModal={modalIsOpen}
        closeModal={closeModal}
      />
      {/* <h2 className="form--title">Register</h2> */}
      <form onSubmit={submitHandler} method="post" className="form">
        <label className="input">
          <span>Username</span>
          <br />
          <input type="text" name="userName" autoComplete="off" />
        </label>
        <label className="input">
          <span>Email</span>
          <br />
          <input type="text" name="email" autoComplete="off" />
        </label>
        <label className="input">
          <span>Password</span>
          <br />
          <input type="password" name="password" autoComplete="off" />
        </label>
        <button className="form--btn" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
