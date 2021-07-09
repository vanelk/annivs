import React from 'react';
import propTypes from 'prop-types';
import { useHistory } from 'react-router';
import { Setting as SettingsIcon } from '../Icons';
import styles from './app-bar.module.scss';
export default function AppBar({ title }) {
    const history = useHistory();
    const goTo = (link) => history.push(link);
    return (
        <nav className={styles.app_bar}>
            <h3 className={styles.app_bar__title}>
                {title}
            </h3>
            <div className={styles.app_bar__icon_container}>
                <button aria-label="settings" className={styles.app_bar__btn} onClick={() => goTo("/app/settings")}>
                    <span className={styles.app_bar__icon} >
                        <SettingsIcon />
                    </span>
                </button>
            </div>
        </nav>
    )
}

AppBar.prototype = {
    title: propTypes.oneOf([
        propTypes.string,
        propTypes.node,
        propTypes.arrayOf(propTypes.node)
    ])
}