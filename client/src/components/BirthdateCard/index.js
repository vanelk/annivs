import React from 'react';
import propTypes from 'prop-types';
import './style.scss';
function BirthdateCard({date}) {
    return (
        <div className="birthday-card">
            <div className="birthday-card__label">
                <span className="icon-calendar"/>
                Birthdate
            </div>
            <div>
            {date.toLocaleString('default', { month: 'long' })} {date.getDate()}, {date.getFullYear()}
            </div>
        </div>
    )
}
BirthdateCard.prototype = {
    date: propTypes.instanceOf(Date),
}
export default BirthdateCard;