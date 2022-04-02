import "../App.css";
import data from "../data";

function Filter({ completeDate, setFilteredData, setGenreId }) {
  const changeHandler = (e) => {
    if (e.target.value == "All") {
      setFilteredData(completeDate);
      setGenreId(0);
      return;
    } else {
      const id = data.genres.filter((genre) => {
        if (genre.name == e.target.value) {
          return genre.id;
        }
      });
      setGenreId(id[0].id);
      setFilteredData(
        completeDate.filter((movie) => movie.genre_ids.includes(id[0].id))
      );
    }
  };
  return (
    <>
      <div className="filter-movies">
        <h4 style={{ color: "#E2D784" }}>Filter through your mood</h4>
        <select id="dropdown" onChange={changeHandler}>
          <option value="All">All</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Horror">Horror</option>
          <option value="Science Fiction">Sci-Fi</option>
          <option value="Mystery">Mystery</option>
        </select>
        <br />
      </div>
    </>
  );
}

export default Filter;
