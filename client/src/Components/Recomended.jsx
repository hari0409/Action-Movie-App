import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Movie from "./Movie";

function Recomended() {
  const history = useNavigate();
  // const [recomended, setRecomended] = useState([]);
  const [recMovies, setRecMovies] = useState([]);
  const [recSeries, setRecSeries] = useState([]);
  const [empty, setEmpty] = useState(false);

  useEffect(async () => {
    let existuser = JSON.parse(localStorage.getItem("user"));
    if (existuser == null) {
      history("/login");
    } else {
      const user = await axios.get(
        `http://localhost:5000/api/user/${existuser._id}/watchlists`
      );
      if (user.data.series.length + user.data.movies.length == 0) {
        setEmpty(true);
        console.log("Empty List");
      } else {
        let movieArray = user.data.movies;
        let seriesArray = user.data.series;
        let movieDataURL = [];
        let seriesDataURL = [];
        for (let i = 0; i < movieArray.length; i++) {
          const dataURL = await fetch(
            `https://api.themoviedb.org/3/movie/${movieArray[i]}/recommendations?api_key=${process.env.REACT_APP_MOVIE_APIKEY}&language=en-US&page=1`
          );
          const data = await dataURL.json();
          data.results.map((e)=>{
            movieDataURL.push(e)
          })
          let newMovieDataURL = [...new Set(movieDataURL)];
          setRecMovies(newMovieDataURL);
        }
        for (let i = 0; i < seriesArray.length; i++) {
          const dataURL = await fetch(
            `https://api.themoviedb.org/3/tv/${seriesArray[i]}/recommendations?api_key=${process.env.REACT_APP_MOVIE_APIKEY}&language=en-US&page=1`
          );
          const data = await dataURL.json();
          data.results.map((e)=>{
            seriesDataURL.push(e)
          })
          let newSeriesDataURL = [...new Set(seriesDataURL)];
          setRecSeries(newSeriesDataURL);
        }
      }
    }
  }, []);

  return (
    <>
      <div className="main-body">
        {empty ? (
          <>
            <h2 style={{ color: "white" }}>
          Browse & add some movies or series to your watchlist to see recommendations
            </h2>
          </>
        ) : (
          <>
            <h2 style={{ color: "white" }}>Recomended Movies:</h2>
            {recMovies ? (
              <>
                <motion.div className="popular-movies" layout={true}>
                  {recMovies.map((e) => {
                    return (
                      <>
                        <AnimatePresence>
                          <div>
                            <Movie movie={e} type="search" subType="movie" />
                          </div>
                        </AnimatePresence>
                      </>
                    );
                  })}
                </motion.div>
              </>
            ) : (
              <>
                <h2 style={{ color: "white" }}>Loading Movie Recomendation</h2>
              </>
            )}
            <h2 style={{ color: "white" }}>Recomended TV Shows:</h2>
            {recSeries ? (
              <>
                <motion.div className="popular-movies" layout={true}>
                  {recSeries.map((e) => {
                    return (
                      <>
                        <AnimatePresence>
                          <div>
                            <Movie movie={e} type="search" subType="series" />
                          </div>
                        </AnimatePresence>
                      </>
                    );
                  })}
                </motion.div>
              </>
            ) : (
              <>
                <h2 style={{ color: "white" }}>Loading Series Recomendation</h2>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Recomended;
