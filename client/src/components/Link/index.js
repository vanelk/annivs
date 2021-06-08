import React from 'react';
import propTypes from 'prop-types';
import {Link as RouterLink, useLocation} from 'react-router-dom';
function Link({to, children}) {
    const {pathname} = useLocation();
    return ( <RouterLink to={{
        pathname: to,
        state: { from: pathname }
    }} className="no-decoration" >{children}</RouterLink> )
}
Link.propTypes = {
    children: propTypes.any,
    to: propTypes.string.isRequired
}

export default Link;