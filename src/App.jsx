//Libraries
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
//Components
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./components/routes/Home";
import Login from "./components/routes/Login";
import SearchList from "./components/routes/SearchList";
import TrendList from "./components/routes/TrendList";
import FavoritesList from "./components/routes/FavoritesList";
import MovieDetail from "./components/routes/MovieDetail";

//Styles
import "./App.css";

function App() {
  //States
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const [isSearchBarSelected, setIsSearchBarSelected] = useState(false);

  function updateToken(token) {
    setToken(token);
    localStorage.setItem("token", token);
  }
  function updateUserName(userName) {
    setUserName(userName);
    localStorage.setItem("userName", userName);
  }
  function restartApp() {
    setToken(null);
    setUserName(null);
    localStorage.clear();
  }
  return (
    <div
      className="app-container"
      onClick={() => setIsSearchBarSelected(false)}
    >
      <Header
        userName={userName}
        token={token}
        restartApp={restartApp}
        isSearchBarSelected={isSearchBarSelected}
        setIsSearchBarSelected={setIsSearchBarSelected}
      />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/login"
            element={
              <Login
                token={token}
                updateToken={updateToken}
                updateUserName={updateUserName}
              />
            }
          />
          <Route path="/trending" element={<TrendList token={token} />} />
          <Route path="/search" element={<SearchList token={token} />} />
          <Route path="/favorites" element={<FavoritesList token={token} />} />
          <Route path="/detail" element={<MovieDetail token={token} />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
