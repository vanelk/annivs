import { useQuery } from '@apollo/client';
import React from 'react'
import { useLocation } from 'react-router';
import { FETCH_INDIVIDUAL_BY_NAME_QUERY } from '../graphql/queries';
import Loader from './Loader';
import PersonItem from '../components/PersonItem';
import { randomAvatarImg } from '../components/Avatar';
import cake from '../assets/images/cake.png';
import Link from '../components/Link';
import notfound from '../assets/images/search404.png'
export default function SearchList() {
    const query = new URLSearchParams(useLocation().search).get("q");
    const { data, loading } = useQuery(FETCH_INDIVIDUAL_BY_NAME_QUERY, {
        variables: { name: (query) }
    });
    var toDisplay;
    if (loading) return (<Loader />)
    if (query && data?.getIndividuals.length < 1) {
        return (
            <div className="text-center mt-2">
                <div>
                    <img className="mw-100" alt="not-found" src={notfound} />
                </div>
                <h2>Sorry we could find any results for "{query}"</h2>
                <p className="text-inactive">
                    Please check spelling or try a different name
            </p>
            </div>
        )
    } else if (query && data.getIndividuals.length >= 1) {
        toDisplay = data.getIndividuals.map((individual, i) => {
            let date = new Date(individual.birthdate.isoString)
            let src = randomAvatarImg();
            return (
                <Link key={i} className="no-decoration" to={`/app/p/${individual.id}`}>
                    <PersonItem name={individual.name} date={date} img={src} cake={cake} />
                </Link>)
        })
    }
    return (
        <div className="results mt-10">
            {toDisplay}
        </div>
    )
}
