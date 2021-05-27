import React from 'react'
export default function Container({variant, className, ...rest}) {
    return (
        <div className={["container", className, variant].join(" ")} {...rest}/>
    )
}
