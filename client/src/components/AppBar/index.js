import React from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import styles from './style.module.scss';
import { Setting as SettingsIcon, Search as SearchIcon } from '../Icons';
function AppBar({ title }) {
    const history = useHistory();
    const goTo = (link)=>history.push(link);
    return (
        <nav className={styles.app_bar}>
            <h3 className={styles.app_bar__title}>{title}</h3>
            <div className={styles.app_bar__icon_container}>
                <button aria-label="settings" className={styles.app_bar__btn} onClick={()=>goTo("/app/settings")}>
                    <span className={styles.app_bar__icon} >
                        <SettingsIcon/>
                    </span>
                </button>
                <button aria-label="search" className={styles.app_bar__btn} onClick={()=>goTo("/app/search")}>
                    <span className={styles.app_bar__icon} >
                        <SearchIcon/>
                    </span>
                </button>
            </div>
        </nav>
    )
}
AppBar.propTypes = {
    title: propTypes.string
}
export default AppBar;