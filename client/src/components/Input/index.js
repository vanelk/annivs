import React from 'react';
import propTypes from 'prop-types';
import './style.scss';
function Input({label, error, ...rest}) {
    return (
        <div className={error?"error":""}>
            <label htmlFor={`${label}-1`} className="label">{label}</label>
            <input id={`${label}-1`} className="input" {...rest}></input>
        </div>
    )
}

Input.propTypes = {
    label: propTypes.string.isRequired,
    error: propTypes.bool
}
export default Input;