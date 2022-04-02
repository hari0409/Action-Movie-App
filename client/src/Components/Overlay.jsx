import React from "react";
import { Popover } from "react-bootstrap";

function Overlay({ movie }) {
  return (
    <>
      <Popover.Header>
        {movie.title ||
          movie.name ||
          movie.original_name ||
          movie.original_title}
      </Popover.Header>

      <Popover.Body style={{ background: "#1A1A40" }}>
        <strong style={{ color: "white", marginRight: "5px" }}>
          Description:
        </strong>
        <span>{movie.overview}</span>
        <br />
        <strong style={{ color: "white", marginRight: "5px" }}>USER RATING:</strong>
        {movie.vote_average >= 7 ? (
          <span style={{ color: "lightgreen" }}>
            <strong>{movie.vote_average.toFixed(2)}</strong>
          </span>
        ) : movie.vote_average < 7 && movie.vote_average >= 5 ? (
          <span style={{ color: "yellow" }}>
            <strong>{movie.vote_average.toFixed(2)}</strong>
          </span>
        ) : (
          <span style={{ color: "red" }}>
            <strong>{movie.vote_average.toFixed(2)}</strong>
          </span>
        )}
      </Popover.Body>
    </>
  );
}

export default Overlay;
