import React from 'react';
import {connect} from "react-redux";

import {getGenresSelected, getMovies, getFilters} from "../../store/selectors/moviesSelectors";
import {includesGenreInArray, includeValueInTheRange} from "../../helpers/moviesHelper";
import {MovieConnected} from "../../components/movie";

class MoviesList extends React.PureComponent {
    state = {
        moviesUniqueKeys: [],
    };

    static getDerivedStateFromProps({movies}, state) {
        const {results} = movies;
        const {moviesUniqueKeys} = state;

        if (results.length !== moviesUniqueKeys.length) {
            const newUniqueIds = results?.map((item, index) => {
                return {key: index};
            });

            return {
                moviesUniqueKeys: newUniqueIds,
            }
        }

        return state;
    }

    render() {
        const {moviesUniqueKeys} = this.state;
        const {movies, genresSelected, filters} = this.props;
        const {fromDate, toDate, ratingFrom, ratingTo} = filters;
        const {results} = movies;

        return results?.length && moviesUniqueKeys.length ? (
            <div className="movie__wrapper">
                {results.map((movie, index) => {
                    const {genre_ids, release_date, vote_average} = movie;
                    const releaseDate = Number(release_date?.slice(0, 4));

                    if (includesGenreInArray(genre_ids, genresSelected) &&
                        includeValueInTheRange(fromDate, toDate, releaseDate) &&
                        includeValueInTheRange(ratingFrom, ratingTo, vote_average)) {
                        return (<MovieConnected key={moviesUniqueKeys[index].key} movie={movie} />);
                    }

                    return null;
                })}
            </div>
        ) : null;
    };
}

const mapStateToProps = state => ({
    movies: getMovies(state),
    genresSelected: getGenresSelected(state),
    filters: getFilters(state),
});

export const MoviesListConnected = connect(mapStateToProps)(MoviesList);