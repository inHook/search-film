import React from 'react';

import {FilterPanelConnected} from "../../components/filtersPanel";

import "./style.scss";

export const MainPage = () => (
    <div className="main-page">
        <div className="main-page__inner">
            <FilterPanelConnected />
        </div>
    </div>
);