import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../containers/MovieList";

export default function SearchList({ token }) {
  const apiAth = "d76c5df85f84510c22bbc25e156327ce";
  // const language = "es-ES";
  const language = "en-US";
  let [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q"));
  const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=${apiAth}&language=${language}&query=${searchTerm}`;

  useEffect(() => {
    setSearchTerm(searchParams.get("q"));
  }, [searchParams]);

  return <MovieList endPoint={endPoint} token={token} />;
}
