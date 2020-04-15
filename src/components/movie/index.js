import React from 'react';
import {connect} from "react-redux";
import classNames from "classnames";

import {apiMoviesUrl} from "../../API";
import {apiMovie} from "../../backendServices/movie";
import {putViewedMovie} from "../../store/actionCreators/movies";
import {getViewedMovies} from "../../store/selectors/moviesSelectors";

import "./style.scss";

const Movie = React.memo(({movie, putViewedMovie, viewedMovies}) => {
        const {id, title, overview, vote_average, release_date, poster_path, backdrop_path} = movie;
        const viewedMovie = viewedMovies.includes(id);

        return (
            <div
                className={classNames(
                    "movie__container",
                    {"movie__container-viewed": viewedMovie},
                )}
                onClick={() => apiMovie.getMovieDetails(id)}
            >
                {backdrop_path && (
                    <div
                        className="movie__background-image"
                        style={{backgroundImage: `url(${apiMoviesUrl.getImageW1280}${backdrop_path})`}}
                    />
                )}

                <div className="movie">
                    <div className="movie__viewed" onClick={(e) => {
                        e.stopPropagation();
                        putViewedMovie(id);
                    }}>
                        {viewedMovie ? (
                            <span title="Удалить из просмотренных" role="img" aria-label="stop">&#9940;</span>
                        ) : (
                            <span title="Отметить как просмотренный" role="img" aria-label="mark">&#9989;</span>
                        )}
                    </div>

                    <div className="movie__image">
                        {poster_path ? (
                            <img className="movie__image-element" src={`${apiMoviesUrl.getImageW200}${poster_path}`}
                                 alt="" />
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
            </div>
        )
    }
);

const mapStateToProps = state => ({
    viewedMovies: getViewedMovies(state),
});

const mapDispatchToProps = {
    putViewedMovie,
};

export const MovieConnected = connect(mapStateToProps, mapDispatchToProps)(Movie);