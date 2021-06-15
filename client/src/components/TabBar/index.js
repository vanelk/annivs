import React, { useState } from 'react';
import propTypes from 'prop-types';
import Link from '../Link';
import joinStyles from '../../lib/joinStyles';
import styles from './style.module.scss';
import {Home as HomeIcon, Add as AddIcon, Calendar as CalendarIcon} from  '../Icons';
function TabBar({onChange}) {
    const [active, setActive] = useState(1);
    const handleClick = (n) => {
        setActive(n);
        if (typeof onChange === 'function') onChange(n);
    }
    return (
        <div className={styles.tab_bar}>
            <button aria-label="home" onClick={() => handleClick(1)} className={joinStyles(styles.tab_btn, active === 1 ? styles.active : null)}>
                <HomeIcon/>
            </button>
            <div className={styles.tab_btn}>
                <Link to="/app/add">
                    <button aria-label="add" className={styles.pill}>
                        <AddIcon/>
                    </button>
                </Link>
            </div>
            <button aria-label="calendar" onClick={() => handleClick(2)} className={joinStyles(styles.tab_btn, active === 2 ? styles.active : null)}>
                <CalendarIcon/>
            </button>
        </div>
    )
}

TabBar.propTypes = {
    onChange: propTypes.func
}
export default TabBar;