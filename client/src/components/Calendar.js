import React, { useState } from 'react';
function Calendar({ variant, onChange, value }) {
    const weekdays = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
    const dates = [];
    const [active, setActive] = useState(value);
    const startDate = new Date(value);
    const handleClick = (nDate) => {
        if(isEqual(value, nDate)) return;
        setActive(nDate);
        if (typeof onChange === 'function') {
            onChange(nDate);
        }
    }
    const handleMonthChange = (theta)=>{
        let nDate = changeMonth(value, theta);
        setActive(nDate);
        if (typeof onChange === 'function') {
            onChange(nDate);
        }
    }
    let numOfDays = 7;
    if (variant === "lg") {
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
        <div className="calendar">
            {
               (variant === "lg")&&(
                    <div className="controls">
                        <button onClick={()=>handleMonthChange(-1)} className="icon-arrow-left"></button>
                        <button onClick={()=>handleMonthChange(1)} className="icon-arrow-right"></button>
                    </div>
               )
            }
            <div className="grid">
                {weekdays.map((day, i) => <div key={i} className="weekday">{day}</div>)}
                {dates.map((day, i) =>
                (<div key={i} onClick={() => handleClick(day)} className="date">
                    <div className={["date__text", isSameMonth(day, active) || variant !== 'lg' ? '': 'text__grey',isEqual(day, active) ? 'date__active' : ''].join(" ")}>
                        {day.getDate()}
                    </div>
                </div>)
                )}
            </div>
        </div>
    )
}
function isSameMonth(date1, date2){
    return date1.getMonth() === date2.getMonth()
}
function isEqual(date1, date2) {
    return (date1.getYear() === date2.getYear()) &&
        (date1.getMonth() === date2.getMonth()) &&
        (date1.getDate() === date2.getDate());
}
function getDayOfWeek (date) {
    let d = new Date();
    if(isEqual(date, d)) return "Today";
    return new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(date);
}
function monthName(date){
    const formatter = new Intl.DateTimeFormat('en', { month: 'short' });
    return formatter.format(date);
}
function dateToYMD(date){
    var d = date.getDate();
    var m = date.getMonth() + 1;
    var y = date.getFullYear();
    return '' + y + '/' + (m<=9 ? '0' + m : m) + '/' + (d <= 9 ? '0' + d : d);
}
function changeMonth(date, val){
    return new Date(date.getFullYear(), date.getMonth()+val, 1);
}
export {Calendar as default, getDayOfWeek, isSameMonth, isEqual, monthName, dateToYMD}