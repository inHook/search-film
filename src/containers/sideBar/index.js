import React from 'react';
import {connect} from "react-redux";
import classNames from "classnames";

import {apiMoviesUrl} from "../../API";
import {getGenres, getSideBar, getLoadMovie} from "../../store/selectors/moviesSelectors";
import {toggleSideBar} from "../../store/actionCreators/movies";
import {Loader} from "../../components/ui/loader";

import "./style.scss";

const getGenreNames = (genres, genresAll) => {
    const genresName = [];
    genres.forEach(genre => {
        genresName.push(genresAll[genre.id].name);
    });
    return genresName.join(", ");
};

const SideBar = ({sideBar, toggleSideBar, genresAll, loadMovie}) => {
    const {poster_path, title, overview, vote_average, release_date, genres, runtime, tagline} = sideBar?.movie;
    const hours = (runtime / 60).toFixed(0);
    const minutes = runtime % 60;

    return (
        <div className={classNames(
            "movies-sidebar",
            {"movies-sidebar__open": sideBar.open},
        )}>
            {sideBar?.open && (
                <>
                    <span
                        onClick={() => toggleSideBar(false)}
                        className="movies-sidebar__close"
                    >
                        &#10006;
                    </span>

                    {loadMovie ? (
                        <div className="lds-wrapper">
                            <Loader />
                        </div>
                    ) : (
                        <div className="movies-sidebar__content">
                            <div className="movies-sidebar__poster">
                                <img className="movies-sidebar__poster-element"
                                     src={`${apiMoviesUrl.getImageW500}${poster_path}`} alt="" />
                            </div>
                            <div className="movies-sidebar__title">{title}</div>
                            <div className="movies-sidebar__description">{overview}</div>
                            {tagline && (
                                <div className="movies-sidebar__tagline">
                                    Слоган:&nbsp;
                                    {tagline}
                                </div>
                            )}
                            <div className="movies-sidebar__rating">
                                Рейтинг фильма
                                <span className="movie__description-rating">{vote_average}</span>
                            </div>
                            <div className="movies-sidebar__release">
                                Премьера:&nbsp;
                                {release_date}
                            </div>
                            <div className="movies-sidebar__duration">
                                Продолжительность:&nbsp;
                                {`${hours}:${minutes}`}
                            </div>
                            <div className="movies-sidebar__genres">
                                Жанры:&nbsp;
                                {getGenreNames(genres, genresAll)}
                            </div>
                        </div>
                    )}

                </>
            )
            };
        </div>
    );
};

const mapStateToProps = state => ({
    sideBar: getSideBar(state),
    genresAll: getGenres(state),
    loadMovie: getLoadMovie(state),
});

const mapDispatchToProps = {
    toggleSideBar,
};

export const SideBarConnected = connect(mapStateToProps, mapDispatchToProps)(SideBar);