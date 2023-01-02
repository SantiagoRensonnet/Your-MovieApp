import emptyStar from "../../assets/icons/stars/star-regular.svg";
import halfStar from "../../assets/icons/stars/star-half-stroke-solid.svg";
import fullStar from "../../assets/icons/stars/star-solid.svg";
import "../../css/utils/StarsBar.css";
function convertToStars(rate) {
  const base = Math.floor(rate / 2);
  const decimal = rate / 2 - base >= 0.4 && rate / 2 - base <= 0.6 ? 0.5 : 0;
  const rate5Stars = base + decimal;

  let starsArray = [];
  for (let i = 1; i <= 5; i++) {
    if (i % rate5Stars >= 0 && i / rate5Stars <= 1) {
      starsArray.push(
        <img
          key={i - 1}
          src={fullStar}
          className="star-bar--icon"
          alt="full-star"
        />
      );
    } else if (i % rate5Stars === 0.5 && Math.floor(i / rate5Stars) <= 1) {
      starsArray.push(
        <img
          key={i - 1}
          src={halfStar}
          className="star-bar--icon"
          alt="half-star"
        />
      );
    } else {
      starsArray.push(
        <img
          key={i - 1}
          src={emptyStar}
          className="star-bar--icon"
          alt="empty-star"
        />
      );
    }
  }
  return starsArray;
}
export default function StarsBar({ rate }) {
  const stars = convertToStars(rate);
  return <div>{stars}</div>;
}
