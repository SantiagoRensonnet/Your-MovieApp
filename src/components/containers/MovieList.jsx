// Libraries
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import ErrorModal from "../Modals/ErrorModal";
import Modal from "react-modal";
//Components
import MovieCard from "./MovieCard";
//Styles
import "../../css/containers/MovieList.css";

Modal.setAppElement("#root");

export default function MovieList({ token, endPoint = "favorite" }) {
  //Modal setup
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [errorData, setErrorData] = useState({});

  //React Router Hooks
  const navigate = useNavigate();

  //States
  const [movieData, setMovieData] = useState(() => {
    if (endPoint !== "favorite") {
      return JSON.parse(localStorage.getItem("favs"));
    } else {
      return [];
    }
  });
  const [favoriteMoviesData, setFavoriteMoviesData] = useState(
    () => JSON.parse(localStorage.getItem("favs")) || []
  );
  const [heartWasClicked, setHeartWasClicked] = useState(false);

  useEffect(() => {
    if (endPoint !== "favorite") {
      axios
        .get(endPoint)
        .then((res) => {
          setMovieData(res.data.results);
        })
        .catch((error) => {
          setErrorData({ code: error.code, message: error.message });
          openModal();
        });
    }
  }, [endPoint !== "favorite" ? endPoint : null]);

  useEffect(() => {
    localStorage.setItem("favs", JSON.stringify(favoriteMoviesData));
    setHeartWasClicked(false);
    if (endPoint === "favorite") {
      setMovieData(favoriteMoviesData);
    }
  }, [heartWasClicked]);
  //Modal Handlers
  function openModal() {
    setModalIsOpen(true);
  }
  function closeModal() {
    setModalIsOpen(false);
  }
  //List Handlers
  function onCardClick(id) {
    navigate(`/detail?movieID=${id}`);
  }

  //Favorites Handler
  function onHeartClick(event, isFavorite, id, title, image, overview) {
    if (!isFavorite) {
      //check for another instance of the movie in localStorage
      //if it is none then
      //add movie data to localStorage "favs"
      setFavoriteMoviesData((moviesData) => {
        const newArray = moviesData;
        if (
          favoriteMoviesData &&
          !favoriteMoviesData.some((movie) => movie.id === id)
        ) {
          newArray.push({ id, title, image, overview });
        }
        return newArray;
      });
    } else {
      //remove movie data from localStorage "favs"
      setFavoriteMoviesData((moviesData) =>
        moviesData.filter((movie) => movie.id !== id)
      );
    }
    setHeartWasClicked(true);
  }

  if (movieData) {
    var movieList =
      endPoint !== "favorite"
        ? movieData
            .filter((movie) => movie.overview && movie.poster_path)
            .map((movie, index) => {
              const path =
                "https://image.tmdb.org/t/p/original" + movie.poster_path;
              const movieImg = movie.poster_path
                ? { backgroundImage: `url(${path})` }
                : null;
              return (
                <MovieCard
                  maxChar={320}
                  onCardClick={onCardClick}
                  id={movie.id}
                  key={index}
                  image={movieImg}
                  title={movie.original_title}
                  overview={movie.overview}
                  onHeartClick={onHeartClick}
                />
              );
            })
        : movieData.map((movie, index) => (
            <MovieCard
              maxChar={320}
              onCardClick={onCardClick}
              id={movie.id}
              key={index}
              image={movie.image}
              title={movie.title}
              overview={movie.overview}
              onHeartClick={onHeartClick}
            />
          ));
  }

  return (
    <>
      {!token && <Navigate replace to="/login" />}
      <ErrorModal
        errorData={errorData}
        openModal={modalIsOpen}
        closeModal={closeModal}
      />
      {movieData && movieData.length > 0 ? (
        <div className="list-container">
          <div className="table">{movieList}</div>
        </div>
      ) : (
        endPoint === "favorite" && <p style={{ fontSize: "1.2rem" }}>Empty</p>
      )}
    </>
  );
}
