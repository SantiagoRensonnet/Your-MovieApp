import MovieList from "../containers/MovieList";

export default function TrendList({ token }) {
  const apiAth = "d76c5df85f84510c22bbc25e156327ce";
  // const language = "es-ES";
  const language = "en-US";
  const endPoint = `https://api.themoviedb.org/3/discover/movie?api_key=${apiAth}&language=${language}`;
  return <MovieList endPoint={endPoint} token={token} />;
}
