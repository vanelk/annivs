import React from 'react';
import propTypes from 'prop-types';
import './style.scss';
function Fieldset({ className, children}) {
    return (
        <fieldset className={["fieldset", className].join(" ")}>
            { children }
        </fieldset>
    )
}

Fieldset.propTypes = {
    className: propTypes.string,
    children: propTypes.any
}

export default Fieldset;