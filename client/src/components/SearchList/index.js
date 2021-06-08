import { useQuery } from '@apollo/client';
import React from 'react'
import { useLocation } from 'react-router';
import { FETCH_INDIVIDUAL_BY_NAME_QUERY } from '../../graphql/queries';
import Loader from '../Loader';
import ContactItem from '../ContactItem';
import Link from '../Link';
import notfound from '../../assets/images/search404.png'
import './style.scss';
export default function SearchList() {
    const query = new URLSearchParams(useLocation().search).get("q");
    const { data, loading } = useQuery(FETCH_INDIVIDUAL_BY_NAME_QUERY, {
        variables: { name: (query) }
    });
    var toDisplay;
    if (loading) return (<Loader />)
    if (query && data?.getContactsByName.length < 1) {
        return (
            <div className="search-results__empty">
                <img className="image" alt="not-found" src={notfound} />
                <h2>Sorry we could find any results for <strong>"{query}"</strong></h2>
                <p className="text-body">
                    Please check spelling or try a different name
            </p>
            </div>
        )
    } else if (query && data.getContactsByName.length >= 1) {
        toDisplay = data.getContactsByName.map((contact, i) => {
            let date = new Date(contact.birthdate)
            return (
                <Link key={i} className="no-decoration" to={`/app/p/${contact._id}`}>
                    <ContactItem name={contact.name} date={date} img={contact.picture} />
                </Link>)
        })
    }
    return (
        <div className="search-results">
            {toDisplay}
        </div>
    )
}
