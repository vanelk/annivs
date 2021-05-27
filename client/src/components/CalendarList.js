import React from 'react'
import Link from './Link';
import Loader from './Loader';
import PersonItem from './PersonItem';
import {randomAvatarImg, randomColor} from './Avatar';
import dogimg from '../assets/images/dog.png';
export default function CalendarList({ data, loading }) {
    if (loading) {
        return (<Loader />)
    }
    if (data && (data.getBirthdate || data.getBirthdates)) {
        let dobs = data.getBirthdate || data.getBirthdates;
        if (!dobs[0]) dobs = [dobs];
        let rendered = [];
        for (let dob of dobs) {
            let d = new Date(dob.isoString.split("T")[0].replace(/-/g, '/'));
            const av = randomAvatarImg();
            const color =randomColor();
            rendered = rendered.concat(dob.individuals.map(({ id, name }) => (
                <Link key={id} to={`/app/p/${id}`}>
                    <PersonItem name={name} date={d} img={av} color={color} />
                </Link>
            )))
        }
        return rendered;

    } else {
        return (
            <div className="text-center">
                <img className="mw-100 w-65" src={dogimg} alt="dog" />
                <h2 className="text-secondary">No birthdays on this day</h2>
                <h3 className="text-sky-blue">
                    Use the + button <br />to add a new birthday
                </h3>
            </div>
        );
    }
}
