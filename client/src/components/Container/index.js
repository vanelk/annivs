import React from 'react';
import propTypes from 'prop-types';
import joinStyles from '../../lib/joinStyles';
import styles from './style.module.scss';
function Container({ variant, children }) {
    return (
        <div className={joinStyles(styles.container, styles[variant])} >
            {children}
        </div>
    )
}
Container.propTypes = {
    variant: propTypes.oneOf([
        'fluid',
        'normal'
    ]),
    children: propTypes.any
}
export default Container;