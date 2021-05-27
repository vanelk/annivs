import React from 'react'
import {Link as RouterLink, useLocation} from 'react-router-dom'
export default function Link({to, className, ...rest}) {
    const {pathname} = useLocation();
    return ( <RouterLink to={{
        pathname: to,
        state: { from: pathname }
    }} className={["no-decoration", className].join(" ")} {...rest}/> )
}
