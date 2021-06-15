import React from 'react';
import propTypes from 'prop-types';
import Link from '../Link';
import Loader from '../Loader';
import ContactItem from '../ContactItem';
import dogimg from '../../assets/images/dog.png';
import styles from './style.module.scss';
function ContactList({ data, loading }) {
    if (loading) {
        return (<Loader />)
    }
    if (data?.length ) {
        return data.map(({ _id, name, birthdate, picture }) => {
            const date = new Date(birthdate);
            return (
                <Link key={_id} to={`/app/p/${_id}`}>
                    <ContactItem name={name} date={date} img={picture} />
                </Link>
            )
        })

    } else {
        return (
            <div className={styles.contact_list__empty}>
                <img className={styles.image} src={dogimg} alt="dog" />
                <h2 className={styles.title}>No birthdays on this day</h2>
                <h3 className={styles.text_body}>
                    Use the + button <br />to add a new birthday
                </h3>
            </div>
        );
    }
}

ContactList.propTypes = {
    data: propTypes.array.isRequired,
    loading: propTypes.bool
}
export default ContactList;