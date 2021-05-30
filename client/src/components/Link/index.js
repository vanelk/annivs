import React from 'react';
import propTypes from 'prop-types';
import {Link as RouterLink, useLocation} from 'react-router-dom';
function Link({to, className, ...rest}) {
    const {pathname} = useLocation();
    return ( <RouterLink to={{
        pathname: to,
        state: { from: pathname }
    }} className={["no-decoration", className].join(" ")} {...rest}/> )
}
Link.propTypes = {
    to: propTypes.string.isRequired,
    className: propTypes.string
}

export default Link;