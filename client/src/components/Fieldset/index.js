import React from 'react';
import propTypes from 'prop-types';
import './style.scss';
function Fieldset({ children}) {
    return (
        <fieldset className="fieldset">
            { children }
        </fieldset>
    )
}

Fieldset.propTypes = {
    children: propTypes.any
}

export default Fieldset;