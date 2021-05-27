import React from 'react';
export default function Paper({className, ...rest}) {
    return (
        <div className={["paper", className].join(" ")} {...rest}/>
    )
}
