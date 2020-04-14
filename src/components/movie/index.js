import React from 'react';

import {apiMoviesUrl} from "../../API";
import {apiMovie} from "../../backendServices/movie";

import "./style.scss";

export const Movie = ({movie}) => {
    const {title, overview, vote_average, release_date, poster_path} = movie;

    return (
        <div className="movie" onClick={() => apiMovie.getMovieDetails(movie.id)}>
            <div className="movie__image">
                {poster_path ? (
                    <img className="movie__image-element" src={`${apiMoviesUrl.getImageW200}${poster_path}`} alt="" />
                ) : (
                    <div className="movie__image-null"><span>Изображение отсутствует</span></div>
                )}
            </div>
            <div className="movie__description">
                <div className="movie__description-title">{title}</div>
                <div className="movie__description-element">{overview}</div>
                <div className="movie__description-element">
                    Рейтинг фильма
                    <span className="movie__description-rating">{vote_average}</span>
                </div>
                <div className="movie__description-element">
                    Год выпуска:
                    <span className="movie__description-year">
                        {` ${release_date?.slice(0, 4)}`}
                    </span>
                </div>
            </div>
        </div>
    )
};