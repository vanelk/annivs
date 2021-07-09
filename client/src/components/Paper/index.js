import React from 'react';
import propTypes from 'prop-types';
import styles from './style.module.scss';
function Paper({ children }) {
    return (
        <div className={styles.paper}>
            {children}
        </div>
    )
}
Paper.propTypes = {
    children: propTypes.node
}
export default Paper;