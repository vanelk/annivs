import React, { useState } from 'react'
import AppBar from '../../components/AppBar'
import Calendar from '../../components/Calendar'
import { getDayOfWeek, monthName } from '../../lib/dates'
import Container from '../../components/Container'
import TabBar from '../../components/TabBar'
import ContactList from '../../components/ContactList'
import { useQuery } from '@apollo/client';
import { FETCH_BIRDAYS_DATE_QUERY, FETCH_BIRTHDAYS_MONTH_QUERY } from '../../graphql/queries';
import Error from '../../components/Error';
import { register } from '../../serviceWorker';
import { useHistory, useLocation } from 'react-router-dom'
import styles from './style.module.scss';
export default function App() {
    const history = useHistory();
    const {hash} = useLocation();
    const [activeDate, setActiveDate] = useState(new Date());
    var query = FETCH_BIRDAYS_DATE_QUERY;
    var variables = { date: activeDate };
    if(hash === "#month"){
        query = FETCH_BIRTHDAYS_MONTH_QUERY
        const month = activeDate.getMonth();
        variables = {month}
    }
    const { loading, data, error } = useQuery(query, { variables, fetchPolicy: 'cache-and-network' });
    const handleTabChange = (n) => {
        if(n === 1){
            setActiveDate(new Date());
            history.push("");
        } else {
            history.push("#month")
        }
        
    }
    const handleDateChange = (date) => {
        setActiveDate(date);
        if(hash === "#month"){
            //TODO: Scroll to the person item
        }
    }
    const title = hash === ""? getDayOfWeek(activeDate) : monthName(activeDate) + " " + activeDate.getFullYear();
    if(error) return (<Error error={error.message}/>)
    return (
        <div className={styles.app}>
            <Container>
                <AppBar title={title}></AppBar>
                <Calendar variant={hash === "#month" ? "full" : "partial"} value={activeDate} onChange={handleDateChange}/>
            </Container>
            <main className={styles.main} role="main">
                <div className={styles.contact_list_container}>
                    <ContactList data={data?.getBirthdatesByDate || data?.getBirthdatesByMonth || []} loading={loading}/>
                </div>
            </main>
            <TabBar onChange={handleTabChange} />
        </div>
    )
}
register();
