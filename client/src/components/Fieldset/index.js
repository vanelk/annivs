import React from 'react';
import propTypes from 'prop-types';
import styles from './style.module.scss';
function Fieldset({ children}) {
    return (
        <fieldset className={styles.fieldset}>
            { children }
        </fieldset>
    )
}

Fieldset.propTypes = {
    children: propTypes.node
}

export default Fieldset;