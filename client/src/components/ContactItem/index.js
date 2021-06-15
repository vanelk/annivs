import React from 'react';
import propTypes from 'prop-types';
import Avatar from '../Avatar';
import cake from '../../assets/images/cake.png';
import styles from './style.module.scss';
function ContactItem({ name, date, img }) {
    let today = new Date();
    return (
        <div className={styles.contact_item}>
            <Avatar src={img} size="sm" />
            <div className={styles.contact_item__text_container}>
                <div className={styles.text_title}>{name}</div>
                <div className={styles.text_body}>
                    {date.toLocaleString('default', { month: 'long' })} {date.getDate()}, {date.getFullYear()}
                </div>
            </div>
            {
                (today.getMonth() === date.getMonth() && today.getDate() === date.getDate())?
                (<img src={cake} alt="cake" className={styles.contact_item__right_icon}/>):
                (<div className={styles.bd__text}>{diffDatestimeString(today, date)}</div>)
            }
        </div>
    )
}
function diffDatestimeString(date1, date2){
    const d1 = new Date(100, date1.getMonth(), date1.getDate());
    const d2 = new Date(100, date2.getMonth(), date2.getDate());
    const day = 1000 * 60 * 60 * 24;
    let diff = undefined;
    if(d1 <= d2){
       diff = (d2 - d1);
    } else{
        diff = (365 * day) - (d1 - d2);
    }
    if(diff <= 30 * day){
        return Math.ceil((diff/day)) + 'd';
    } else if(diff <= 365 * day){
        return (( diff / ( day * 31 )) | 0) + 'm';
    } else {
        return '1y';
    }
}
ContactItem.propTypes = {
    name: propTypes.string.isRequired,
    date: propTypes.instanceOf(Date).isRequired,
    img: propTypes.string.isRequired
}
export default ContactItem;