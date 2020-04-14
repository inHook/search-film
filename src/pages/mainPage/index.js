import React from 'react';

import {FilterPanel} from "../../containers/filtersPanel";

import "./style.scss";

export const MainPage = () => (
    <div className="main-page">
        <div className="main-page__inner">
            <FilterPanel />
        </div>
    </div>
);