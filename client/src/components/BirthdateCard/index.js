import React from 'react';
import propTypes from 'prop-types';
import Paper from '../Paper/index';
import './style.scss';
function BirthdateCard({className, date, ...rest}) {
    return (
        <Paper className={["birthday-card", className].join(" ")} {...rest}>
            <div className="birthday-card__label">
                <span className="icon-calendar"/>
                Birthdate
            </div>
            <div>
            {date.toLocaleString('default', { month: 'long' })} {date.getDate()}, {date.getFullYear()}
            </div>
        </Paper>
    )
}
BirthdateCard.prototype = {
    className: propTypes.string,
    date: propTypes.instanceOf(Date),
}
export default BirthdateCard;