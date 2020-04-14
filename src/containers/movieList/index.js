import React from 'react';
import {connect} from "react-redux";

import {getGenresSelected, getMovies, getLoadMovies, getFilters} from "../../store/selectors/moviesSelectors";
import {Movie} from "../../components/movie";
import {Loader} from "../../components/ui/loader";

import "./style.scss";

const includesGenreInArray = (genre_ids = [], genresSelected = []) => {
    if (!genresSelected.length) return true;

    for (let i = 0; i < genre_ids.length; i++) {
        if (genresSelected.includes(genre_ids[i])) {
            return true;
        }
    }
};

const includesYearsInMovie = (filters, release_date) => {
      const releaseDate = Number(release_date?.slice(0,4));
      const {fromDate, toDate} = filters;

      if ((fromDate && toDate && releaseDate >= filters.fromDate && releaseDate <= filters.toDate) ||
          (fromDate && !toDate && releaseDate >= filters.fromDate) ||
          (!fromDate && toDate && releaseDate <= filters.toDate) ||
          (!fromDate && !toDate)) {
          return true;
      }
};

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
        const {movies, genresSelected, loadMovies, filters} = this.props;
        const {results} = movies;

        return (
            <div className="movie__wrapper">
                {loadMovies && (
                    <div className="lds-wrapper">
                        <Loader />
                    </div>
                )}

                {results?.length && moviesUniqueKeys.length ? results.map((movie, index) => {
                    const {genre_ids, release_date} = movie;

                    if (includesGenreInArray(genre_ids, genresSelected) &&
                    includesYearsInMovie(filters, release_date)) {
                        return (<Movie key={moviesUniqueKeys[index].key} movie={movie} />);
                    }

                    return null;
                }) : null}
            </div>
        );
    };
}

const mapStateToProps = state => ({
    movies: getMovies(state),
    genresSelected: getGenresSelected(state),
    loadMovies: getLoadMovies(state),
    filters: getFilters(state),
});

export const MoviesListConnected = connect(mapStateToProps)(MoviesList);