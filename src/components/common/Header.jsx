//Assets
import trendingLogo from "../../assets/icons/navbar/arrow-trend-up-solid.svg";
//Libraries
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//Hooks
import { useResize } from "../../hooks/useResize";
//Components
import SearchBarFixed from "../utils/SearchBarFixed";
import SearchBarExpandable from "../utils/SearchbarExpandable";
import ChoiceModal from "../Modals/ChoiceModal";
//Styles
import "../../css/common/Header.css";
import { useState } from "react";

export default function Header({
  userName,
  token,
  restartApp,
  isSearchBarSelected,
  setIsSearchBarSelected,
}) {
  //Auxiliary Functions
  function getInitials(user) {
    const userNameArrayByWord = user.trim().split(" ");
    const name = userNameArrayByWord[0];
    const lastName =
      userNameArrayByWord.length > 1 ? userNameArrayByWord[1] : "";
    return lastName
      ? `${name[0].toUpperCase()} ${lastName[0].toUpperCase()}`
      : name[0].toUpperCase();
  }
  //Burguer Menu
  const [burgerActive, setBurgerActive] = useState(false);
  //Modal setup
  const [modalIsOpen, setModalIsOpen] = useState(false);
  //Navigate setup
  const navigate = useNavigate();
  //Mobie Hook
  const isMobile = useResize();
  //Events
  //Modal Handlers
  function openModal() {
    setModalIsOpen(true);
  }
  function closeModal() {
    setModalIsOpen(false);
  }
  function logout() {
    restartApp();
    closeModal();
    navigate("./");
  }
  function toggleBurger() {
    setBurgerActive(burgerActive ? false : true);
  }

  return (
    <>
      <ChoiceModal
        description={"Do you want to logout?"}
        chooseYes={logout}
        chooseNo={closeModal}
        openModal={modalIsOpen}
        closeModal={closeModal}
      />
      <div className="header">
        {isMobile && (
          <SearchBarExpandable
            isSearchBarSelected={isSearchBarSelected}
            setIsSearchBarSelected={setIsSearchBarSelected}
          />
        )}
        <div
          className={
            isMobile
              ? "header--title-container  mobile"
              : "header--title-container"
          }
          onClick={() => openModal()}
        >
          {token && (
            <div className="avatar">
              <div className="initials">{getInitials(userName)}</div>
            </div>
          )}
          <h2 className="header--title">
            <span className="first-word">Your </span>
            <span className="second-word">MovieApp</span>
          </h2>
        </div>
        <nav className="header--navbar">
          <div className={`header--nav-menu ${burgerActive ? "active" : ""}`}>
            <Link to="/" className="header--nav-item">
              Home
            </Link>
            <div className="header--trending-container header--nav-item">
              <img
                src={trendingLogo}
                alt="trending"
                className="header--trending-logo"
              />
              <Link to="trending">Trending</Link>
            </div>
            <Link to="favorites" className="header--nav-item">
              Favorites
            </Link>
          </div>
          <div
            className={`header--hamburger-menu ${burgerActive ? "active" : ""}`}
            onClick={toggleBurger}
          >
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
            <span className="hamburger-bar"></span>
          </div>
        </nav>

        {!isMobile && (
          <SearchBarFixed
            isSearchBarSelected={isSearchBarSelected}
            setIsSearchBarSelected={setIsSearchBarSelected}
          />
        )}
      </div>
    </>
  );
}
