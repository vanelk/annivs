import React from 'react'
import propTypes from 'prop-types';
import styles from './style.module.scss';
import { joinStrings } from '../../utils/stringUtil';
function FloatingButton({ y = 40, color = 'primary', children }) {
    return (
        <button style={{bottom: y}} className={joinStrings(styles.floating_btn, styles[color])}>
            {children}
        </button>
    )
}
FloatingButton.propTypes = {
    children: propTypes.node,
    y: propTypes.number,
    color: propTypes.string
}

export default FloatingButton