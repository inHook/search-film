import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import {MainPage} from "./pages/mainPage";
import {MoviesPageConnected} from "./pages/moviePage";

import './App.scss';

export const Application = () => (
    <Router>
        <Switch>
            <Route path="/movies-list" exact>
                <MoviesPageConnected />
            </Route>
            <Route path="/" exact>
                <MainPage />
            </Route>
        </Switch>
    </Router>
);