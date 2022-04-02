import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import Movie from "./Movie";
import Navigator from "./Navigator";

function Popular() {
  const [completeData, setCompleteData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [genreId, setGenreId] = useState(0);
  const [pageCounter, setPageCounter] = useState(1);
  const [type, setType] = useState("movies");

  const getData = async () => {
    var responce = "";
    if (type === "movies") {
      responce = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_APIKEY}&language=en-US&page=${pageCounter}`
      );
    } else {
      responce = await fetch(
        ` https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_MOVIE_APIKEY}&language=en-US&page=${pageCounter}`
      );
    }
    const data = await responce.json();
    setCompleteData(data.results);
    if (genreId == 0) {
      setFilteredData(data.results);
    } else {
      const filtered = await data.results.filter((movie) =>
        movie.genre_ids.includes(genreId)
      );
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    getData();
  }, [pageCounter, type]);
  return (
    <div className="main-body">
      <div className="container">
        <div className="row">
          <div className="col justify-content-center d-flex">
            <button
              onClick={() => {
                setType("movies");
              }}
              className="btn btn-outline-primary"
            >
              Movies
            </button>
          </div>
          <div className="col justify-content-center d-flex">
            <button
              onClick={() => {
                setType("series");
              }}
              className="btn btn-outline-primary"
            >
              Series
            </button>
          </div>
        </div>
      </div>
      <br />
      <Filter
        completeDate={completeData}
        setFilteredData={setFilteredData}
        setGenreId={setGenreId}
      />
      {type === "movies" ? (
        <h3 className="main-header" style={{ color: "#F10086" }}>
          <strong>Movies</strong>
        </h3>
      ) : (
        <h3 className="main-header" style={{ color: "#F10086" }}>
          <strong>Series</strong>
        </h3>
      )}
      {filteredData ? (
        <>
          <motion.div className="popular-movies" layout={true}>
            {filteredData.map((e) => {
              return (
                <>
                  <AnimatePresence>
                    <div>
                      <Movie movie={e} type={type} />
                    </div>
                  </AnimatePresence>
                </>
              );
            })}
          </motion.div>
        </>
      ) : (
        <div style={{ color: "white" }}>Loading....</div>
      )}
      <Navigator pageCounter={pageCounter} setPageCounter={setPageCounter} />
    </div>
  );
}

export default Popular;
