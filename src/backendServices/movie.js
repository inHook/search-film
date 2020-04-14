import axios from "axios";
import {apiKey, apiMoviesUrl, language} from "../API";
import {requestStatus} from "../constants/requestStatus";
import {putFoundMovies, putGenres, toggleSideBar, loadMovie, loadMovies} from "../store/actionCreators/movies";
import {store} from "../store/store";
import {getAppRef} from "../helpers/moviesHelper";

export const apiMovie = {
    getMoviesBySearchQuery(searchQuery, page, load, resolve, reject) {
        if (searchQuery) {
            store.dispatch(loadMovies(true));

            axios.get(`${apiMoviesUrl.search}${searchQuery}&${language.ru}&page=${page}`)
                .then(result => {
                    const {status, data} = result;
                    store.dispatch(loadMovies(false));

                    if (status === requestStatus.OK && data?.results?.length) {
                        store.dispatch(putFoundMovies(data, searchQuery, load));
                        const appRef = getAppRef();

                        if (window.pageYOffset === (appRef?.current?.scrollHeight - window.innerHeight)) {
                            apiMovie.getMoviesBySearchQuery(searchQuery, page + 1, true);
                        }

                        typeof resolve === "function" && resolve();
                    }
                })
                .catch(error => {
                    console.error(error);
                    store.dispatch(loadMovies(false));
                    typeof resolve === "function" && reject();
                })
        }
    },
    getGenres() {
        axios.get(apiMoviesUrl.getGenreList)
            .then(result => {
                const {status, data} = result;

                if (status === requestStatus.OK && data.genres.length) {
                    const genres = {};
                    data.genres.forEach(genre => {
                        const {name, id} = genre;

                        genres[genre.id] = {
                            id,
                            name,
                        };
                    });

                    store.dispatch(putGenres(genres));
                }
            })
            .catch(error => console.error(error));
    },
    getMovieDetails(movieId) {
        const state = store.getState();

        if (movieId !== state.sideBar.movie.id) {
            store.dispatch(loadMovie(true));

            axios.get(`${apiMoviesUrl.getMovie}${movieId}?api_key=${apiKey}&${language.ru}`)
                .then(result => {
                    const {status, data} = result;

                    if (status === requestStatus.OK && data?.id) {
                        store.dispatch(toggleSideBar(true, data));
                        store.dispatch(loadMovie(false));
                    }
                })
                .catch(error => {
                    store.dispatch(loadMovie(false));
                    console.error(error);
                });
        }
    },
};