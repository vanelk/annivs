import React from 'react';
import propTypes from 'prop-types';
import Link from '../Link/index';
import Loader from '../Loader/index';
import ContactItem from '../ContactItem/index';
import dogimg from '../../assets/images/dog.png';
import './style.scss';
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
            <div className="contact-list__empty">
                <img className="image" src={dogimg} alt="dog" />
                <h2 className="title">No birthdays on this day</h2>
                <h3 className="text-body">
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