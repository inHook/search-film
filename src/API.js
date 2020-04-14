export const apiKey = "df690feb7a810d645a7e12040fccf6e7";

const apiUrl = "https://api.themoviedb.org";
const tmdbUrl = "https://image.tmdb.org";

export const language = {
    ru: "language=ru",
    en: "language=en",
};

export const appendToResponse = {
    videos: "append_to_response=videos",
    images: "append_to_response=images",
};

export const apiMoviesUrl = {
    getGenreList: `${apiUrl}/3/genre/movie/list?api_key=${apiKey}&language=ru`,
    getImageOriginal: `${apiUrl}/t/p/original`,
    getImageW200: `${tmdbUrl}/t/p/w200`,
    getImageW500: `${tmdbUrl}/t/p/w500`,
    getImageW1280: `${tmdbUrl}/t/p/w1280`,
    getMovie: `${apiUrl}/3/movie/`,
    search: `${apiUrl}/3/search/movie?api_key=${apiKey}&${language.ru}&query=`,
};
