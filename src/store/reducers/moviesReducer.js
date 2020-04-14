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
import {LOCAL_STORAGE_MOVIE_KEY} from "../../constants/localStorage";
import {saveDataToLocalStorage, getDataFromLocalStorage} from "../../helpers/moviesHelper";

const initialState = {
    movies: {
        page: 0,
        total_results: 0,
        total_pages: 0,
        results: [],
        load: false,
    },
    genres: [],
    genresSelected: [],
    userPreferences: {
        searchQuery: "",
        language: "ru",
    },
    sideBar: {
        open: false,
        movie: {},
        load: false,
    },
    loadMovie: false,
    loadMovies: false,
    filters: {
        fromDate: 0,
        toDate: 0,
        ratingFrom: 0,
        ratingTo: 0,
    },
    viewedMovies: [],
};

const stateFromLocalStorage = getDataFromLocalStorage(LOCAL_STORAGE_MOVIE_KEY);

export const moviesReducer = (state = stateFromLocalStorage || initialState, action) => {
    switch (action.type) {
        case PUT_FOUND_MOVIES:
            const {movies, load} = action.payload;
            movies.results.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

            const results = load ? [...state.movies.results, ...movies.results] : [...movies.results];

            const newMovies = {
                page: movies.page,
                total_results: movies.total_results,
                total_pages: movies.total_pages,
                results,
            };

            return saveDataToLocalStorage(LOCAL_STORAGE_MOVIE_KEY, {
                ...state,
                movies: newMovies,
            });

        case PUT_GENRES:
            const genres = action.payload;

            return saveDataToLocalStorage(LOCAL_STORAGE_MOVIE_KEY, {
                ...state,
                genres,
            });

        case PUT_SELECTED_GENRES:
            const genresSelected = action.payload;

            return saveDataToLocalStorage(LOCAL_STORAGE_MOVIE_KEY, {
                ...state,
                genresSelected,
            });

        case SET_SEARCH_QUERY:
            const searchQuery = action.payload;
            const userPreferences = {
                ...state.userPreferences,
                searchQuery,
            };

            return saveDataToLocalStorage(LOCAL_STORAGE_MOVIE_KEY, {
                ...state,
                userPreferences,
            });

        case TOGGLE_SIDE_BAR:
            const {open, movie} = action.payload;

            return saveDataToLocalStorage(LOCAL_STORAGE_MOVIE_KEY, {
                ...state,
                sideBar: {
                    open,
                    movie,
                }
            });

        case LOAD_MOVIE:
            return saveDataToLocalStorage(LOCAL_STORAGE_MOVIE_KEY, {
                ...state,
                loadMovie: action.payload,
            });

        case LOAD_MOVIES:
            return saveDataToLocalStorage(LOCAL_STORAGE_MOVIE_KEY, {
                ...state,
                loadMovies: action.payload,
            });

        case SET_VALUE_IN_FILTER:
            const {nameFilter, filterDate} = action.payload;

            return saveDataToLocalStorage(LOCAL_STORAGE_MOVIE_KEY, {
                ...state,
                filters: {
                    ...state.filters,
                    [nameFilter]: filterDate,
                }
            });

        case PUT_VIEWED_MOVIE:
            const viewedMovies = [...state.viewedMovies];
            const movieId = action.payload;

            if (viewedMovies.includes(movieId)) {
                viewedMovies.splice(viewedMovies.indexOf(movieId), 1);
            } else {
                viewedMovies.push(movieId);
            }

            return saveDataToLocalStorage(LOCAL_STORAGE_MOVIE_KEY, {
                ...state,
                viewedMovies,
            });

        default:
            return state;
    }
};