import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    addToSavedList.history.push(`/update-movie/${params.id}`);
  };

  const handleDelete = (e) => {
    e.preventDefault();

    axios
      .delete(`http://localhost:3001/api/movies/${params.id}`)
      .then((res) => {
        params.setMovie(res.data);
        params.history.push('/movies');
      })
      .catch((err) => console.error("Movie.js: delete failed: err: ", err.message)
      );
  };

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button onClick={handleUpdate}>
        Edit
      </button>
      <button onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default Movie;
