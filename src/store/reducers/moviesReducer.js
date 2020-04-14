import {
    PUT_FOUND_MOVIES,
    PUT_GENRES,
    PUT_SELECTED_GENRES,
    SET_SEARCH_QUERY,
    TOGGLE_SIDE_BAR,
    LOAD_MOVIE,
    LOAD_MOVIES,
    SET_YEARS_IN_FILTER,
} from "../actions";

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
    }
};

export const moviesReducer = (state = initialState, action) => {
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

            return {
                ...state,
                movies: newMovies,
            };

        case PUT_GENRES:
            const genres = action.payload;

            return {
                ...state,
                genres,
            };

        case PUT_SELECTED_GENRES:
            const genresSelected = action.payload;

            return {
                ...state,
                genresSelected,
            };

        case SET_SEARCH_QUERY:
            const searchQuery = action.payload;
            const userPreferences = {
                ...state.userPreferences,
                searchQuery,
            };

            return {
                ...state,
                userPreferences,
            };

        case TOGGLE_SIDE_BAR:
            const {open, movie} = action.payload;

            return {
                ...state,
                sideBar: {
                    open,
                    movie,
                }
            };

        case LOAD_MOVIE:
            return {
                ...state,
                loadMovie: action.payload,
            };

        case LOAD_MOVIES:
            return {
                ...state,
                loadMovies: action.payload,
            };

        case SET_YEARS_IN_FILTER:
            const {nameFilter, filterDate} = action.payload;

            return {
                ...state,
                filters: {
                    ...state.filters,
                    [nameFilter]: filterDate,
                }
            };

        default:
            return state;
    }
};