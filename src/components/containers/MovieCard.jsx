import "../../css/containers/MovieCard.css";
//Assets
import emptyHeart from "../../assets/icons/favorite/heart-regular.svg";
import fullHeart from "../../assets/icons/favorite/heart-solid.svg";
import { useState, useEffect } from "react";
export default function MovieCard({
  id,
  title,
  image,
  overview,
  maxChar,
  onCardClick,
  onHeartClick,
}) {
  const [isFavorite, setIsFavorite] = useState(
    localStorage.getItem("favs")
      ? JSON.parse(localStorage.getItem("favs")).some(
          (movie) => movie.id === id
        )
      : false
  );

  //Event Handlers (Favorites)
  function onFavoriteHover() {
    document.getElementById(`heart-id-${id}`).style.backgroundImage = isFavorite
      ? `url(${emptyHeart})`
      : `url(${fullHeart})`;
  }
  function onFavoriteHoverOut() {
    document.getElementById(`heart-id-${id}`).style.backgroundImage = isFavorite
      ? `url(${fullHeart})`
      : `url(${emptyHeart})`;
  }
  let style = isFavorite
    ? { backgroundImage: `url(${fullHeart})` }
    : { backgroundImage: `url(${emptyHeart})` };
  return overview ? (
    <div className="movie">
      <div className="movie-card">
        <div className="movie-card--favorite-container">
          <div
            alt={isFavorite ? "full-heart" : "empty-heart"}
            id={`heart-id-${id}`}
            className="movie-card--favorite-heart"
            style={style}
            onMouseOver={onFavoriteHover}
            onMouseOut={onFavoriteHoverOut}
            onClick={(e) => {
              onHeartClick(e, isFavorite, id, title, image, overview);
              document.location.pathname !== "/favorites" &&
                setIsFavorite((isFav) => !isFav); //toggle favorite
            }}
          ></div>
        </div>
        <div className="movie-card--click-me" onClick={() => onCardClick(id)}>
          <h1>+</h1>
        </div>
        <div className="movie-card--content">
          <div className="movie-card--image" style={image}></div>
          <div className="movie-card--info">
            <h2 className="movie-card--title">{title}</h2>
            <p className="movie-card--description">
              {maxChar && overview.length > maxChar
                ? overview.slice(0, maxChar) + " (...)"
                : overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="movie">
      <div className="movie-card">
        <div className="movie-card--click-me" onClick={() => onCardClick(id)}>
          <h1>+</h1>
        </div>
        <div className="movie-card--content full-image">
          {!image && <h2 className="movie-card--title">{title}</h2>}
          <div className="movie-card--image" style={image}></div>
        </div>
      </div>
    </div>
  );
}
