import React from 'react';
import av0 from '../assets/images/av0.png';
import av1 from '../assets/images/av1.png';
import av2 from '../assets/images/av2.png';
import av3 from '../assets/images/av3.png';
import av4 from '../assets/images/av4.png';
import av5 from '../assets/images/av5.png';
import av6 from '../assets/images/av6.png';
import av7 from '../assets/images/av7.png';
const avatars = [av0, av1, av2, av3, av4, av5, av6, av7];

const randomAvatarImg = () => avatars[Math.random() * avatars.length | 0]
const randomColor = () => {
    return "#"+ Array.from(new Array(3)).map(_=>((Math.random()*255) | 0 ).toString(16)).join("")
}
function isColor (color) {
    if(typeof color === 'string'){
        return color.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/g) !== null;
    }
    return false
}
function Avatar({ variant, color, src, style, className }) {
    const colorVal = isColor(color) ? color : randomColor();
    return (
        <div className={["avatar", variant, className].join(" ")} style={{backgroundColor: colorVal, ...style}}>
            <img alt="avatar--profile" className="avatar__img" src={src}/>
        </div>
    )
}
export {Avatar as default, randomAvatarImg, randomColor};