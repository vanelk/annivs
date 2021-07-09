import React from 'react';
import propTypes from 'prop-types';
import { changeMonth, isEqual, isSameMonth } from '../../utils/dateUtil';
import { joinStrings } from '../../utils/stringUtil';
import { ArrowLeft, ArrowRight } from '../Icons';
import styles from './style.module.scss';
function daysForLocale(localeName = 'en-US', weekday = 'short') {
    const format = new Intl.DateTimeFormat(localeName, { weekday }).format;
    return [...Array(7).keys()]
        .map((day) => format(new Date(Date.UTC(2021, 5, day))));
}

function Calendar({ onChange, value, locale }) {
    const weekdays = daysForLocale(locale);
    const dates = [];
    const startDate = new Date(value);
    const handleClick = (nDate) => {
        if (isEqual(value, nDate)) return;
        onChange(nDate);
    }
    const handleMonthChange = (theta) => {
        let nDate = changeMonth(value, theta);
        onChange(nDate);
    }
    startDate.setDate(1);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    for (let i = 0; i < 42; i++) {
        let d = new Date(startDate);
        d.setDate(d.getDate() + i)
        dates.push(d);
    }
    return (
        <div className={styles.calendar}>
            <div className={styles.calendar_controls}>
                <button className={styles.icon_btn} onClick={() => handleMonthChange(-1)}><ArrowLeft /></button>
                <button className={styles.icon_btn} onClick={() => handleMonthChange(1)} ><ArrowRight /></button>
            </div>

            <div className={styles.grid}>
                {weekdays.map((day, i) => <div key={i} className={styles.weekday}>{day}</div>)}
                {dates.map((day, i) =>
                (<div key={i} onClick={() => handleClick(day)} className={styles.date}>
                    <div className={joinStrings(styles.date__text, isSameMonth(day, value) ? '' : styles.text__grey, isEqual(day, value) ? styles.date__active : null)}>
                        {day.getDate()}
                    </div>
                </div>)
                )}
            </div>
        </div>
    )
}

Calendar.propTypes = {
    onChange: propTypes.func.isRequired,
    value: propTypes.instanceOf(Date).isRequired,
    locale: propTypes.string
}
export { Calendar as default, daysForLocale }