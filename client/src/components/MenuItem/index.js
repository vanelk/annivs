import React from 'react';
import propTypes from 'prop-types';
import styles from './style.module.scss';
function MenuItem({ children, ...rest}) {
    return (
        <li className={styles.menu_item} {...rest}>
            { children }
        </li>
    )
}


MenuItem.propTypes = { 
    children: propTypes.node
}

export default MenuItem;