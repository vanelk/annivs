import React from 'react';
import propTypes from 'prop-types';
import styles from './style.module.scss';
function Input({label, error, ...rest}) {
    return (
        <div className={error?styles.error:null}>
            <label htmlFor={`${label.toLocaleLowerCase()}__`} className={styles.label}>{label}</label>
            <input id={`${label.toLocaleLowerCase()}__`} className={styles.input} {...rest}></input>
        </div>
    )
}

Input.propTypes = {
    label: propTypes.string.isRequired,
    error: propTypes.bool
}
export default Input;