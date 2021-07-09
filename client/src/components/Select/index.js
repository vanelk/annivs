import React from 'react';
import propTypes from 'prop-types';
import styles from './style.module.scss';
function Select({ values, defaultValue, onChange }) {
    let title = values.filter(({ value }) => value === defaultValue)[0]?.text || values[0].text;
    return (
        <div className={styles.dropdown_container}>
            <button className={styles.dropdown_button}>
                <span className={styles.dropdown_title}>{title}</span>
                <span className={styles.dropdown_arrow}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                    </svg>
                </span>
            </button>
            <div className={styles.dropdown_list_container}>
                <div className={styles.dropdown_list_wrapper}>
                    <ul className={styles.dropdown_list}>
                        {values.map(({ text, value }) => (
                            <li key={value} onClick={() => onChange(value)} className={styles.dropdown_list_item}>
                                {text}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

Select.prototype = {
    values: propTypes.arrayOf(propTypes.object),
    onChange: propTypes.func.isRequired,
    defaultValue: propTypes.any
}

export default Select;