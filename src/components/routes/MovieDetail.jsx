//Assets
import crownLogo from "../../assets/icons/favorite/crown-solid.svg";
// Libraries
import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
// Components
import StarsBar from "../utils/StarsBar";
import ChoiceModal from "../Modals/ChoiceModal";
// Styles
import "../../css/routes/MovieDetail.css";

export default function MovieDetail({ token }) {
  //Modal setup
  const [modalIsOpen, setModalIsOpen] = useState(false);

  //States
  const [movieDetails, setMovieDetails] = useState({});
  const [isFavorite, setIsFavorite] = useState();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const movieId = query.get("movieID");
    const apiAth = "d76c5df85f84510c22bbc25e156327ce";
    // const language = "es-ES";
    const language = "en-US";
    const endPoint = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiAth}&language=${language}`;
    axios.get(endPoint).then((res) => {
      setIsFavorite(
        localStorage.getItem("favs")
          ? JSON.parse(localStorage.getItem("favs")).some(
              (movie) => movie.id === res.data.id
            )
          : false
      );
      setMovieDetails(res.data);
    });
  }, []);

  const path = "https://image.tmdb.org/t/p/original" + movieDetails.poster_path;
  const movieImg = movieDetails.poster_path
    ? { backgroundImage: `url(${path})` }
    : null;
  //Events
  //Modal Handlers
  function openModal() {
    setModalIsOpen(true);
  }
  function closeModal() {
    setModalIsOpen(false);
  }
  function addToFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favs"));
    favorites.push({
      id: movieDetails.id,
      title: movieDetails.original_title,
      image: movieImg,
      overview: movieDetails.overview,
    });
    localStorage.setItem("favs", JSON.stringify(favorites));
    setIsFavorite(true);
  }
  //Delete movie whit confirmation
  function deleteMovie() {
    const favorites = JSON.parse(localStorage.getItem("favs"));
    const newArray = favorites.filter((movie) => movie.id !== movieDetails.id);
    localStorage.setItem("favs", JSON.stringify(newArray));
    setIsFavorite(false);
    closeModal();
  }

  //UI
  let movieUI;

  if (token) {
    if (
      movieDetails &&
      movieImg &&
      movieDetails.original_title &&
      movieDetails.vote_average &&
      movieDetails.release_date &&
      movieDetails.genres &&
      movieDetails.overview
    ) {
      movieUI = (
        <>
          <ChoiceModal
            description={"Do you want to remove the movie from favorites?"}
            chooseYes={deleteMovie}
            chooseNo={closeModal}
            openModal={modalIsOpen}
            closeModal={closeModal}
          />
          <div className="movie-detail--table">
            <div style={movieImg} className="movie-detail--image"></div>
            <div className="movie-detail--info">
              <h2 className="movie-detail--title">
                {movieDetails.original_title}
              </h2>
              <div>
                <StarsBar rate={movieDetails.vote_average} />
              </div>
              <div>Estreno: {movieDetails.release_date}</div>
              <ul className="movie-detail--genres-list">
                {movieDetails.genres &&
                  movieDetails.genres.map((genre, index) => (
                    <li key={index}>{genre.name}</li>
                  ))}
              </ul>
              <h3 className="movie-detail--subtitle">Sinopsis</h3>
              <p className="movie-detail--description">
                {movieDetails.overview}
              </p>
              {isFavorite && (
                <button
                  className="favorite-movie--button"
                  onClick={() => openModal()}
                >
                  <img
                    src={crownLogo}
                    alt="crown"
                    className="favorite-movie--crown-logo"
                  />
                  Favorite Movie
                </button>
              )}
              {!isFavorite && (
                <button
                  onClick={addToFavorites}
                  className="add-to-favorites--button"
                >
                  Add to Favorites
                </button>
              )}
            </div>
          </div>
        </>
      );
    } else {
      movieUI = <h1>Loading...</h1>;
    }
  } else {
    movieUI = <Navigate replace to="/login" />;
  }

  return <>{movieUI}</>;
}
