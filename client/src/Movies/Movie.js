import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const {push} = useHistory();

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

  const handleDelete = (e) => {
    e.preventDefault();

    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then((res) => {
        push('/');
        window.location.reload();
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
      <Link to={`/update-movie/${movie.id}`}>
      <button>
        Edit
      </button>
      </Link>
      <button onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}

export default Movie;
