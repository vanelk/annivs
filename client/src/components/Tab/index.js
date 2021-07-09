import React from 'react';
import propTypes from 'prop-types';
import styles from './style.module.scss';
export default function Tab({ text, icon, onClick }) {
    return (
        <div className={styles.tab}>
            {icon && (
                <div className={styles.tab_icon}>
                    {icon}
                </div>
            )}
            {text && (
                <div className={styles.tab_text}>
                    {text}
                </div>
            )}
        </div>
    )
}
Tab.propTypes = {
    text: propTypes.string,
    icon: propTypes.node,
    onClick: propTypes.func
}