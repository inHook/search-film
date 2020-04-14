import React, {useEffect, useRef} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import {MainPage} from "./pages/mainPage";
import {MoviesPageConnected} from "./pages/moviePage";
import {setAppRef} from "./helpers/moviesHelper";

import './App.scss';

export const Application = () => {
    const appRef = useRef();

    useEffect(() => {
        setAppRef(appRef);
    }, []);

    return (
        <div className="application" ref={appRef}>
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
        </div>
    );
};