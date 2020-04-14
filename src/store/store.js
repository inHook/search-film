import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';
import thunk from "redux-thunk";

import {moviesReducer} from "./reducers/moviesReducer";

export const store = createStore(
    moviesReducer,
    composeWithDevTools(
        applyMiddleware(thunk),
    )
);