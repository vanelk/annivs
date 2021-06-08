import React from 'react';
import propTypes from 'prop-types';
import './style.scss';
function Avatar({ variant, src }) {
    return (
        <div className={["avatar", variant].join(" ")} >
            <img alt="avatar--profile" className="avatar__img" src={src}/>
        </div>
    )
}
Avatar.propTypes = {
    variant: propTypes.oneOf([
        'lg',
        'md',
        'sm'
    ]),
    src: propTypes.string,
}
export default  Avatar;