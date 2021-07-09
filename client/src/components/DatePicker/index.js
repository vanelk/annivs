import React, { Component } from 'react';
import { isEqual, isSameMonth, changeMonth } from '../../utils/dateUtil';
import { joinStrings } from '../../utils/stringUtil';
import styles from './style.module.scss';
export default class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.box = null;
        this.mask = "__/__/____";
        this.locale = props.locale || 'en-US';
        const usedValue = isNaN(new Date(props.value)) ? new Date() : new Date(props.value)
        this.state = {
            dateValue: new Date(usedValue),
            textValue: new Intl.DateTimeFormat('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }).format(usedValue),
            openBox: false
        }
        this.days = Array.from(Array(7)
            .keys())
            .map((day) => new Intl.DateTimeFormat(this.locale, { weekday: 'short' }).format(Date.UTC(2021, 5, day)));
        this.updateDates()
        this.updateDates = this.updateDates.bind(this);
        this.showBox = this.showBox.bind(this);
        this.closeBox = this.closeBox.bind(this);
        this.incrementMonth = this.incrementMonth.bind(this);
        this.decrementMonth = this.decrementMonth.bind(this);
        this.selectDate = this.selectDate.bind(this);
        this.changeInput = this.changeInput.bind(this);
    }
    componentDidUpdate(props) {
        if (this.state.openBox) {
            setTimeout(() => {
                document.body.addEventListener('click', this.closeBox)
            }, 5);
        } else {
            document.body.removeEventListener('click', this.closeBox);
        }
        this.updateDates();
    }

    updateDates() {
        const startDate = (this.state.dateValue.getDate() - this.state.dateValue.getDay());
        this.dates = Array.from(Array(42)
            .keys())
            .map((i) => new Date(new Date(this.state.dateValue).setDate(startDate + i)));
    }
    showBox(ev) {
        ev.preventDefault()
        if (!ev.target.classList.contains(styles.date)) this.setState({ openBox: true });
    }
    closeBox(ev) {
        ev.preventDefault();
        if (!this.box) return document.body.removeEventListener('click', this.closeBox)
        if (!this.box.contains(ev.target)) this.setState({ openBox: false });
    }
    incrementMonth(e) {
        e.preventDefault();
        let nDate = changeMonth(this.state.dateValue, 1);
        this.setState({ dateValue: nDate });
    }
    decrementMonth(e) {
        e.preventDefault();
        let nDate = changeMonth(this.state.dateValue, -1);
        this.setState({ dateValue: nDate });
    }
    selectDate(date) {
        this.props.onChange({ target: { name: [this.props.name], date } });
        this.setState({
            textValue: new Intl.DateTimeFormat('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric'
            }).format(date)
        });
        this.setState({ openBox: false });
    }
    changeInput(e) {
        // const value = e.target.value;
    }
    render() {
        return (
            <div id="date-picker" onClick={this.showBox} className={styles.datepicker} >
                <label htmlFor={this.props.label} className={styles.datepicker_toggle_label}> {this.props.label} </label>
                <input
                    id={this.props.label}
                    placeholder={this.mask.toLocaleUpperCase(this.locale)}
                    onChange={this.changeInput}
                    className={styles.datepicker_toggle}
                    autoComplete="off"
                    value={this.state.textValue}
                />
                <div ref={(ref) => this.box = ref} className={joinStrings(styles.datepicker_box, (this.state.openBox ? styles.show : null))}>
                    <div className={styles.datepicker_top}>
                        <div className={styles.month_selector}>
                            <button className={styles.arrow} onClick={this.decrementMonth}>
                                <span className={styles.icon_arrow_left} />
                            </button>
                            <span className={styles.month_name}>
                                {
                                    new Intl.DateTimeFormat(this.locale, { year: 'numeric', month: 'long' }).format(this.state.dateValue)
                                }
                            </span>
                            <button className={styles.arrow} onClick={this.incrementMonth}>
                                <span className={styles.icon_arrow_right} />
                            </button>
                        </div>
                    </div>
                    <div className={styles.datepicker_calendar}>
                        {
                            this.days.map((day, i) => <span key={i} className={styles.day}>{day}</span>)
                        }
                        {this.dates.map((day, i) => (
                            isSameMonth(day, this.state.dateValue) ?
                                <button key={i} onClick={(e) => { e.preventDefault(); this.selectDate(day) }} className={
                                    joinStrings(
                                        styles.date,
                                        isEqual(day, this.props.value) ? styles.current_day : null
                                    )
                                }>
                                    {day.getDate()}
                                </button>
                                :
                                <span key={i} className={joinStrings(styles.date, styles.faded)}>{day.getDate()}</span>)
                        )
                        }
                    </div>
                </div>
            </div>
        )
    }
}