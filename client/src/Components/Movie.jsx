import React from "react";
import { motion } from "framer-motion";
import { OverlayTrigger, Popover } from "react-bootstrap";
import Overlay from "./Overlay";
import axios from "axios";
import { ToastContainer, toast,Bounce, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Movie({ movie, type, subType}) {
  const addToWatchlist = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const body = {
      userId: user._id,
      movieId: movie.id,
    };
    if (type === "movies") {
      const updatedUser = await axios.put(
        `http://localhost:5000/api/user/${user._id}/addm`,
        body
      );
      if (updatedUser?.data?.msg == "Already added") {
        toast.warn("Already in Watchlist!...");
      } else {
        toast.success("Added to Watchlist!...");
      }
    } else if (type === "series") {
      const updatedUser = await axios.put(
        `http://localhost:5000/api/user/${user._id}/adds`,
        body
      );
      if (updatedUser?.data?.msg == "Already added") {
        toast.warn("Already in Watchlist!...");
      } else {
        toast.success("Added to Watchlist!...");
      }
    }
    else if (type=="search")
    {
      if (subType=="movie")
      {
        const updatedUser = await axios.put(
          `http://localhost:5000/api/user/${user._id}/addm`,
          body
        );
        if (updatedUser?.data?.msg == "Already added") {
          toast.warn("Already in Watchlist!...");
        } else {
          toast.success("Added to Watchlist!...");
        }
      }
      else
      {
        const updatedUser = await axios.put(
          `http://localhost:5000/api/user/${user._id}/adds`,
          body
        );
        if (updatedUser?.data?.msg == "Already added") {
          toast.warn("Already in Watchlist!...");
        } else {
          toast.success("Added to Watchlist!...");
        }
      }
    } 
  };
  return (
    <>
      <OverlayTrigger
        trigger="hover"
        placement="auto"
        delay={{ hide: 400, show: 250 }}
        overlay={
          <Popover>
            <Overlay movie={movie} type={type} />
          </Popover>
        }
      >
        <motion.div
          layout
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="image"
          onDoubleClick={addToWatchlist}
        >
          <h2 className="movie-title">
            {movie.title ||
              movie.name ||
              movie.original_name ||
              movie.original_title}
          </h2>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            alt={
              movie.title ||
              movie.name ||
              movie.original_name ||
              movie.original_title
            }
            style={{ color: "white", textAlign: "center", lineHeight: "50px" }}
            className="image__img"
          />
        </motion.div>
      </OverlayTrigger>
      <ToastContainer closeButton={false} draggable={false} transition={Zoom} autoClose={2500}/>
    </>
  );
}

export default Movie;
