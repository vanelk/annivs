import React from 'react';
import propTypes from 'prop-types';
import styles from './style.module.scss';
function MenuList({ children }) {
    return (
        <ul className={styles.menu_list}>
            { children }
        </ul>
    )
}

MenuList.propTypes = {
    children: propTypes.node
}

export default MenuList;