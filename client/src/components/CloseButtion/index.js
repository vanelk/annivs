import React from 'react';
import propTypes from 'prop-types';
import { CloseSquare as CloseSquareIcon } from '../Icons';
import styles from './style.module.scss';

function CloseButton({onClick}) {
    return (
        <button onClick={onClick} className={styles.close_button}>
            <CloseSquareIcon/>
        </button>
    )
}
CloseButton.propTypes = {
    onClick: propTypes.func
}
export default CloseButton;