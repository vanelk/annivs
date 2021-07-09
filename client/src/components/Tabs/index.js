import React from 'react';
import propTypes from 'prop-types';
import styles from './style.module.scss';
import { joinStrings } from '../../utils/stringUtil';
function Tab({ children, active = 0, onChange }) {
    const handleClick = (i) => {
        onChange(i)
    }
    return (
        <div className={styles.tabs}>
            {
                children && (
                    children.map((child, i) => (
                        <button key={i} onClick={() => handleClick(i)} role="tab" className={joinStrings(styles.tab_wrapper, active == i ? styles.active : null)}>
                            {child}
                        </button>
                    ))
                )
            }
        </div>
    )
}

Tab.propTypes = {
    children: propTypes.node,
    active: propTypes.number,
    onChange: propTypes.func
}
export default Tab;