//Assets
import searchLogoRegular from "../../assets/icons/search-bar/magnifying-glass-regular.svg";
//Libraries
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MsgModal from "../Modals/MsgModal";

//Styles
import "../../css/utils/SearchBarExpandable.css";

export default function SearchBarExpandable({
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
    <>
      <MsgModal
        description={modalMsg}
        openModal={modalIsOpen}
        closeModal={closeModal}
      />
      <form
        onSubmit={submitHandler}
        className={
          isSearchBarSelected
            ? "search-bar-expandable search-bar-selected"
            : "search-bar-expandable"
        }
      >
        <div
          className="search-bar-expandable--logo"
          style={{ backgroundImage: `url(${searchLogoRegular}` }}
          onClick={(e) => {
            e.stopPropagation();
            setIsSearchBarSelected((prevState) => !prevState);
          }}
        ></div>
        <input
          type="text"
          className="search-bar-expandable--input"
          placeholder={isSearchBarSelected ? "Search" : ""}
          onClick={(e) => {
            e.stopPropagation();
            setIsSearchBarSelected(true);
          }}
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
      </form>
    </>
  );
}
