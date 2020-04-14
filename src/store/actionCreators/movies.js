import {
    PUT_FOUND_MOVIES,
    PUT_GENRES,
    PUT_SELECTED_GENRES,
    SET_SEARCH_QUERY,
    TOGGLE_SIDE_BAR,
    LOAD_MOVIE,
    LOAD_MOVIES,
    SET_VALUE_IN_FILTER,
    PUT_VIEWED_MOVIE,
} from "../actions";

export const putFoundMovies = (movies, searchQuery, load) => ({
    type: PUT_FOUND_MOVIES,
    payload: {
        movies,
        searchQuery,
        load,
    },
});

export const putGenres = (genres) => ({
    type: PUT_GENRES,
    payload: genres,
});

export const putSelectedGenres = (genres) => ({
    type: PUT_SELECTED_GENRES,
    payload: genres,
});

export const setSearchQuery = (searchQuery) => ({
    type: SET_SEARCH_QUERY,
    payload: searchQuery,
});

export const toggleSideBar = (boolean, movie = {}) => ({
    type: TOGGLE_SIDE_BAR,
    payload: {
        open: boolean,
        movie,
    }
});

export const loadMovie = (boolean) => ({
    type: LOAD_MOVIE,
    payload: boolean,
});

export const loadMovies = (boolean) => ({
    type: LOAD_MOVIES,
    payload: boolean,
});

export const setValueInFilter = (nameFilter, filterDate) => ({
    type: SET_VALUE_IN_FILTER,
    payload: {
        nameFilter,
        filterDate,
    }
});

export const putViewedMovie = (movieId) => ({
    type: PUT_VIEWED_MOVIE,
    payload: movieId,
});