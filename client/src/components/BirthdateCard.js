import React from 'react'
import Paper from './Paper'
export default function BirthdateCard({className,date, ...rest}) {
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
