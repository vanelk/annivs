import React from 'react';
import propTypes from 'prop-types';
import styles from './style.module.scss';
function ErrorMessage({children}) {
    return (
        <div className={styles.error_box} >
            <ul>
                {children}
            </ul>
        </div>
    )
}
ErrorMessage.propTypes = {
    children: propTypes.node
}
export default ErrorMessage;