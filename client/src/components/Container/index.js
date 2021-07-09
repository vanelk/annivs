import React from 'react';
import propTypes from 'prop-types';
import {joinStrings} from '../../utils/stringUtil';
import styles from './style.module.scss';
function Container({ variant, children }) {
    return (
        <div className={joinStrings(styles.container, styles[variant])} >
            {children}
        </div>
    )
}
Container.propTypes = {
    variant: propTypes.oneOf([
        'fluid',
        'normal'
    ]),
    children: propTypes.node
}
export default Container;