import React from 'react';

import {FilterPanel} from "../../containers/filtersPanel";
import "./style.scss";

export const MainPage = () => {
    return (
        <div className="main-page">
            <FilterPanel />
        </div>
    )
};