import React from 'react';
import propTypes from 'prop-types';
import {Link as RouterLink, useLocation} from 'react-router-dom';
import styles from './style.module.scss';
function Link({to, children}) {
    const {pathname} = useLocation();
    return ( <RouterLink to={{
        pathname: to,
        state: { from: pathname }
    }} className={styles.link} >{children}</RouterLink> )
}
Link.propTypes = {
    children: propTypes.node,
    to: propTypes.string.isRequired
}

export default Link;