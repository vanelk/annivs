import React, { useState } from 'react'
import Container from '../components/Container';
import BackButton from '../components/BackButton';
import SearchBar from '../components/SearchBar';
import SearchList from '../components/SearchList';
import { useHistory, useLocation } from 'react-router';
import './style.scss';
export default function Search() {
    const query = new URLSearchParams(useLocation().search).get("q");
    const history = useHistory();
    const [value, setValue] = useState(query||"");
    const handleChange = (ev)=>{
        setValue(ev.target.value);
    }
    const handleSubmit = (ev) =>{
        ev.preventDefault();
        history.push({
         pathname:"/app/search",
         search:   `?q=${ encodeURI(value) }`
        })
    }
    return (
        <div className="search">
            <Container variant="fluid">
                <BackButton/>
                <form method="GET" onSubmit={handleSubmit} className="search-form">
                    <SearchBar value={value} name="q" onChange={handleChange} placeholder="Search Name" />
                    {query&&(<SearchList/>)}
                </form>
            </Container>
        </div>
    )
}
