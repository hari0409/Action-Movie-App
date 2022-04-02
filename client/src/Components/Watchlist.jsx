import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TiTickOutline } from "react-icons/ti";

function Watchlist() {
  const history = useNavigate();
  const [watchlistItems, setWatchlistItems] = useState([]); //Movie
  const [user, setUser] = useState(null);
  const [changed, setChanged] = useState(false);
  const [number, setnumber] = useState(0);
  const [seriesWatchlist, setSeriesWatchlist] = useState([]); //Series

  useEffect(async () => {
    const existUser = JSON.parse(localStorage.getItem("user"));
    if (!existUser) {
      history("/login");
    } else {
      setUser(existUser);
      const data = await axios.get(
        `http://localhost:5000/api/user/${existUser._id}/watchlists`
      );
      const totalArray = data.data.movies;

      let movieArray = [];
      for (let i = 0; i < totalArray.length; i++) {
        const dataURL = await fetch(
          `https://api.themoviedb.org/3/movie/${totalArray[i]}?api_key=${process.env.REACT_APP_MOVIE_APIKEY}&language=en-US`
        );
        const data = await dataURL.json();
        movieArray.push(data);
      }
      let newMovieArray = [...new Set(movieArray)];
      setWatchlistItems(newMovieArray);

      const totalSeriesArray = data.data.series;
      let seriesArray = [];
      for (let i = 0; i < totalSeriesArray.length; i++) {
        const dataURL = await fetch(
          `https://api.themoviedb.org/3/tv/${totalSeriesArray[i]}?api_key=${process.env.REACT_APP_MOVIE_APIKEY}&language=en-US`
        );
        const data = await dataURL.json();
        seriesArray.push(data);
      }
      let newSeriesArray = [...new Set(seriesArray)];
      setSeriesWatchlist(newSeriesArray);
      const count = newSeriesArray.length + newMovieArray.length;
      setnumber(count);
    }
  }, [changed]);

  const removeFromWatchlist = async (id) => {
    const body = {
      userId: user._id,
      movieId: id,
    };
    const res = await axios.put(
      `http://localhost:5000/api/user/${user._id}/removem`,
      body
    );
    setChanged(!changed);
  };
  const removeFromWatchlistSeries = async (id) => {
    const body = {
      userId: user._id,
      movieId: id,
    };
    const res = await axios.put(
      `http://localhost:5000/api/user/${user._id}/removes`,
      body
    );
    setChanged(!changed);
  };
  return (
    <>
      <div style={{ margin: "5% 5%", color: "white" }}>
        <h2>Your Watchlist ({number})</h2>
      </div>
      <h3 style={{ marginLeft: "5%", color: "white" }}>Your Movies</h3>
      {watchlistItems.map((item) => {
        return (
          <>
            <div
              className="card mb-3"
              style={{
                margin: "5% 5%",
                background: "#151515",
                color: "white",
              }}
              key={item.id}
            >
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                    className="card-img"
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">
                      {item.title ||
                        item.name ||
                        item.original_name ||
                        item.original_title}
                    </h5>
                    <p className="card-text">{item.overview}</p>
                    <div
                      onClick={() => {
                        removeFromWatchlist(item.id);
                      }}
                    >
                      <TiTickOutline
                        size={"1.5rem"}
                        style={{ cursor: "pointer" }}
                      />
                      <p>Watched It</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
      <hr style={{ margin: "5% 5%", border: "3px solid #F0A500" }} />
      <h3 style={{ marginLeft: "5%", color: "white" }}>Your TV Shows</h3>
      {seriesWatchlist.map((item) => {
        return (
          <>
            <div
              className="card mb-3"
              style={{
                margin: "5% 5%",
                background: "#151515",
                color: "white",
              }}
              key={item.id}
            >
              <div className="row no-gutters">
                <div className="col-md-4">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                    className="card-img"
                    alt="..."
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">
                      {item.title ||
                        item.name ||
                        item.original_name ||
                        item.original_title}
                    </h5>
                    <p className="card-text">{item.overview}</p>
                    <div
                      onClick={() => {
                        removeFromWatchlistSeries(item.id);
                      }}
                    >
                      <TiTickOutline
                        size={"1.5rem"}
                        style={{ cursor: "pointer" }}
                      />
                      <p>Watched It</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
}

export default Watchlist;
