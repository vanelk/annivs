import React from 'react';
import propTypes from 'prop-types';
import styles from './style.module.scss';
import {Calendar as CalendarIcon} from '../Icons';
function BirthdateCard({date}) {
    return (
        <div className={styles.birthday_card}>
            <div className={styles.birthday_card__label}>
                <CalendarIcon/>
                Birthdate
            </div>
            <div>
            {date.toLocaleString('default', { month: 'short' })} {date.getDate()}, {date.getFullYear()}
            </div>
        </div>
    )
}
BirthdateCard.prototype = {
    date: propTypes.instanceOf(Date),
}
export default BirthdateCard;