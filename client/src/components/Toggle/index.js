import React from 'react';
import propTypes from 'prop-types';
import styles from './style.module.scss';
export default function Toggle({ value, onChange }) {
    return (
        <label className={styles.toggle} data-checked={value}>
            <input checked={value} onChange={onChange} type="checkbox" />
            <span className={styles.box}></span>
        </label>
    )
}

Toggle.propTypes = {
    value: propTypes.bool.isRequired,
    onChange: propTypes.func.isRequired
}