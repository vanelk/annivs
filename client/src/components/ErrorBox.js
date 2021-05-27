import React from 'react'
export default function ErrorBox({className, ...rest}) {
    return (
        <div className={["error-box", className].join(" ")} {...rest}/>  
    )
}
