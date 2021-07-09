import React, { useState } from 'react'
import Container from '../../components/Container';
import BackButton from '../../components/BackButton';
import SearchBar from '../../components/SearchBar';
import { useQuery } from '@apollo/client';
import { FETCH_INDIVIDUAL_BY_NAME_QUERY } from '../../lib/graphql/queries';
import Loader from '../../components/Loader';
import notfound from '../../assets/images/search404.png'
import ContactList from '../../components/ContactList';
import { useHistory, useLocation } from 'react-router';
import styles from './style.module.scss';
export default function Search() {
    const query = new URLSearchParams(useLocation().search).get("q");
    const history = useHistory();
    const [value, setValue] = useState(query || "");
    const handleChange = (ev) => {
        setValue(ev.target.value);
    }
    const handleSubmit = (ev) => {
        ev.preventDefault();
        history.push({
            pathname: "/app/search",
            search: `?q=${encodeURI(value)}`
        })
    }
    return (
        <div className={styles.search}>
            <Container variant="fluid">
                <BackButton />
                <form method="GET" onSubmit={handleSubmit} className={styles.search_form}>
                    <SearchBar value={value} name="q" onChange={handleChange} placeholder="Search Name" />
                    {query && (<SearchList />)}
                </form>
            </Container>
        </div>
    )
}

function SearchList() {
    const query = new URLSearchParams(useLocation().search).get("q");
    const { data, loading } = useQuery(FETCH_INDIVIDUAL_BY_NAME_QUERY, {
        variables: { name: (query) }
    });
    if (loading) return (<Loader />)
    if (query && data?.getContactsByName.length < 1) {
        return (
            <div className={styles.search_results__empty}>
                <img className={styles.image} alt="not-found" src={notfound} />
                <h2>Sorry we could find any results for <strong>"{query}"</strong></h2>
                <p className={styles.text_body}>
                    Please check spelling or try a different name
                </p>
            </div>
        )
    } else if (query && data.getContactsByName.length >= 1) {
        return (<div className={styles.search_results}>
            <ContactList data={data.getContactsByName} />
        </div>)
    }
}