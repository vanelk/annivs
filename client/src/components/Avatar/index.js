import React from 'react';
import propTypes from 'prop-types';
import styles from './style.module.scss';
import {joinStrings} from '../../utils/stringUtil';
function Avatar({ size = 'sm', src, transparent }) {
    return (
        <div className={joinStrings(styles.avatar, styles[size], transparent? styles.transparent: null)} >
            <img alt="avatar--profile" className={styles.avatar__img} src={src}/>
        </div>
    )
}
Avatar.propTypes = {
    size: propTypes.oneOf([
        'lg',
        'md',
        'sm'
    ]),
    transparent: propTypes.bool,
    src: propTypes.string,
}
export default  Avatar;