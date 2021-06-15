import React from 'react';
import propTypes from 'prop-types';
import { changeMonth, isEqual, isSameMonth } from '../../lib/dates';
import joinStyles from '../../lib/joinStyles';
import {ArrowLeft, ArrowRight}  from '../Icons';
import styles from './style.module.scss';
function Calendar({ variant, onChange, value }) {
    const weekdays = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
    const dates = [];
    const startDate = new Date(value);
    const handleClick = (nDate) => {
        if(isEqual(value, nDate)) return;
        onChange(nDate);
    }
    const handleMonthChange = (theta)=>{
        let nDate = changeMonth(value, theta);
        onChange(nDate);
    }
    let numOfDays = 7;
    if (variant === "full") {
        startDate.setDate(1);
        numOfDays = 42;
    }
    startDate.setDate(startDate.getDate() - startDate.getDay());
    for (let i = 0; i < numOfDays; i++) {
        let d = new Date(startDate);
        d.setDate(d.getDate() + i)
        dates.push(d);
    }
    return (
        <div className={styles.calendar}>
            {
               (variant === "full")&&(
                    <div className={styles.calendar_controls}>
                        <button className={styles.icon_btn} onClick={()=>handleMonthChange(-1)}><ArrowLeft/></button>
                        <button className={styles.icon_btn} onClick={()=>handleMonthChange(1)} ><ArrowRight/></button>
                    </div>
               )
            }
            <div className={styles.grid}>
                {weekdays.map((day, i) => <div key={i} className={styles.weekday}>{day}</div>)}
                {dates.map((day, i) =>
                (<div key={i} onClick={() => handleClick(day)} className={styles.date}>
                    <div className={joinStyles(styles.date__text, isSameMonth(day, value) || variant !== 'full' ? '': styles.text__grey,isEqual(day, value) ? styles.date__active : null)}>
                        {day.getDate()}
                    </div>
                </div>)
                )}
            </div>
        </div>
    )
}

Calendar.propTypes = {
    variant: propTypes.oneOf(
        ['full', 'partial']
    ).isRequired,
    onChange: propTypes.func.isRequired,
    value: propTypes.instanceOf(Date).isRequired
}
export {Calendar as default}