export const includesGenreInArray = (genre_ids = [], genresSelected = []) => {
    if (!genresSelected.length) return true;

    for (let i = 0; i < genre_ids.length; i++) {
        if (genresSelected.includes(genre_ids[i])) {
            return true;
        }
    }
};

export const includeValueInTheRange = (fromValue, toValue, value) => {
    if ((fromValue && toValue && value >= fromValue && value <= toValue) ||
        (fromValue && !toValue && value >= fromValue) ||
        (!fromValue && toValue && value <= toValue) ||
        (!fromValue && !toValue)) {
        return true;
    }
};

export const saveDataToLocalStorage = (key, state) => {
    localStorage.setItem(key, JSON.stringify(state));
    return state;
};

export const getDataFromLocalStorage = key => JSON.parse(localStorage.getItem(key));

let appRef = null;

export const getAppRef = () => appRef;

export const setAppRef = ref => {
    appRef = ref;
};