import React from 'react';
import propTypes from 'prop-types';
import './style.scss';
function Input({label, error, ...rest}) {
    return (
        <div className={error?"error":""}>
            <label className="label">{label}</label>
            <input className="input" {...rest}></input>
        </div>
    )
}

Input.propTypes = {
    label: propTypes.string.isRequired,
    error: propTypes.bool
}
export default Input;