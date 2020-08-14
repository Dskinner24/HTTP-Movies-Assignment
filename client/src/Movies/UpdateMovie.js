import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const UpdateMovieForm = () => {
    const [movie, setMovie] = useState({});
    const { id } = useParams();
    const { goBack } = useHistory();

    const fetchMovieById = (id) => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then((res) => {
                console.log(res.data);
                setMovie(res.data);
            })
            .catch((err) => {
                console.error(err.message);
            });
    };

    const putMovie = (update) => {
        axios
            .put(`http://localhost:5000/api/movies/${id}`, update)
            .then((res) => {
                setMovie(res.data);
                goBack();
            })
            .catch((err) => {
                console.error(err.message);
            });
    };

    useEffect(() => {
        fetchMovieById(id);
    }, [id]);

    const changeHandler = (e) => {
        e.persist();
        if (e.target.name === 'metascore') {
            e.target.value = parseInt(e.target.value);
        }

        setMovie({
            ...movie,
            [e.target.name]: e.target.value,
            stars: e.target.value.split(",")
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        putMovie(movie);
    };

    return (
        <div>
            <h2>Update Movie</h2>
            <form onSubmit={handleSubmit}>
                <input 
                    type='text'
                    name='title'
                    onChange={changeHandler}
                    placeholder='Title'
                    value={movie.title}
                    />
                <input
                    type='text'
                    name='director'
                    onChange={changeHandler}
                    placeholder='Director'
                    value={movie.director}
                />
                <input
                    type='number'
                    name='metascore'
                    onChange={changeHandler}
                    placeholder='Score'
                    value={movie.metascore}
                />

                <button>Update Movie</button>
            </form>
        </div>
    );
};

export default UpdateMovieForm;