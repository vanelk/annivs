import React from 'react';
import './style.scss';
export default function Paper({className, ...rest}) {
    return (
        <div className={["paper", className].join(" ")} {...rest}/>
    )
}
