import { Button, TextField } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import Movie from "./Movie";

function Search() {
  const [searchValue, setSearchValue] = useState(null);
  const [searchData, setSearchData] = useState([]);
  const [searchType, setSearchType] = useState("movie");
  const [searched, setsearched] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    const queryValue = searchValue.replaceAll(" ", "+");
    const responce = await fetch(
      ` https://api.themoviedb.org/3/search/${searchType}?api_key=${process.env.REACT_APP_MOVIE_APIKEY}&language=en-US&query=${queryValue}&page=1`
    );
    const data = await responce.json();
    setSearchData(data.results);
    setsearched(true);
  };
  return (
    <>
      <div className="main-body">
        <div className="container">
          <div className="row">
            <div className="col justify-content-center d-flex">
              <button
                onClick={() => {
                  setSearchType("movie");
                }}
                className="btn btn-outline-primary"
              >
                Movies
              </button>
            </div>
            <div className="col justify-content-center d-flex">
              <button
                onClick={() => {
                  setSearchType("tv");
                }}
                className="btn btn-outline-primary"
              >
                Series
              </button>
            </div>
          </div>
        </div>
        <br />
        {searchType == "movie" ? (
          <>
            <h4 className="main-header" style={{ color: "#DADBBD" }}>
              Search for movies
            </h4>
          </>
        ) : (
          <>
            <h4 className="main-header" style={{ color: "#DADBBD" }}>
              Search for TV Shows
            </h4>
          </>
        )}
        <form onSubmit={submitHandler} style={{ marginTop: "10px" }}>
          <TextField
            label={`Seach ${searchType}`}
            color="secondary"
            focused
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            sx={{ input: { color: "white" } }}
            style={{ marginBottom: "10px" }}
            fullWidth
          />
          <Button variant="outlined" type="submit" size="large">
            Search
          </Button>
        </form>
        <br />
        {searchData.length > 0 ? (
          <>
            <motion.div className="popular-movies" layout={true}>
              {searchData.map((e) => {
                return (
                  <>
                    <AnimatePresence>
                      <div>
                        <Movie movie={e} type="search" subType={searchType}/>
                      </div>
                    </AnimatePresence>
                  </>
                );
              })}
            </motion.div>
          </>
        ) : (
          searched && (
            <>
              <div className="d-flex justify-content-center">
                <h2 style={{ color: "red" }}>No Data Available....</h2>
              </div>
            </>
          )
        )}
      </div>
    </>
  );
}

export default Search;
