import React from 'react';

import "./style.scss";

export const Button = ({textContent, onclick, className}) => (
    <button
        className={`ui-button ${className}`}
        onClick={e => onclick(e)}
    >
        {textContent}
    </button>
);