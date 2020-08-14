import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: [],
};

const UpdateMovie = (props) => {
    const [movie, setMovie] = useState(initialMovie);
    const { id } = useParams();
    const { push } = useHistory();

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/movies/${id}`)
            .then((res) => {
                console.log("itemById: res: ", res);
                setMovie(res.data);
            })
            .catch((err) => console.error("itemById failed: err: ", err.message)
            );
    }, [id]);

    const changeHandler = (e) => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === 'metascore') {
            value = parseInt(value, 6);
        }

        setMovie({
            ...movie,
            [e.target.name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:3000/api/movie/${id}`, movie)
            .then((res) => {
                console.log('UpdateMovie.js: submit success: res: ', res);
                props.setMovies(res.data);
                push(`/api/movies/${id}`);
            })
            .catch((err) => console.error("UpdateMovie.js: submit success: err: ", err.message)
            );
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

export default UpdateMovie;