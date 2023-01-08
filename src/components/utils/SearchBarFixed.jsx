//Assets
import searchLogoRegular from "../../assets/icons/search-bar/magnifying-glass-regular.svg";
//Libraries
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MsgModal from "../Modals/MsgModal";

//Styles
import "../../css/utils/SearchBarFixed.css";

export default function SearchBarFixed({
  isSearchBarSelected,
  setIsSearchBarSelected,
}) {
  //SearchBar states
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  //Modal setup
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");

  function openModal() {
    setModalIsOpen(true);
  }
  function closeModal() {
    setModalIsOpen(false);
  }
  //Event Handlers
  //Submit
  const submitHandler = (event) => {
    event.preventDefault();
    if (!searchTerm.trim()) {
      setModalMsg("Please enter the search field");
      openModal();
      return;
    }
    navigate(`/search?q=${searchTerm}`);
  };
  return (
    <div
      className={`search-bar-fixed ${
        isSearchBarSelected && "search-bar-selected"
      }`}
    >
      <MsgModal
        description={modalMsg}
        openModal={modalIsOpen}
        closeModal={closeModal}
      />
      <form onSubmit={submitHandler}>
        <div
          className="search-bar-fixed--logo"
          style={{ backgroundImage: `url(${searchLogoRegular}` }}
        ></div>
        <input
          type="text"
          className="search-bar-fixed--input"
          placeholder="Search"
          onClick={(e) => {
            e.stopPropagation();
            setIsSearchBarSelected(true);
          }}
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
      </form>
    </div>
  );
}
