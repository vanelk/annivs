import React, { useState } from 'react'
import AppBar from '../components/AppBar'
import Calendar, { getDayOfWeek, monthName } from '../components/Calendar'
import Container from '../components/Container'
import TabBar from '../components/TabBar'
import ContactList from '../components/ContactList'
import { useQuery } from '@apollo/client';
import { FETCH_BIRDAYS_DATE_QUERY, FETCH_BIRTHDAYS_MONTH_QUERY } from '../graphql/queries';
import Error from '../components/Error';
import { registerServiceWorker } from '../services/serviceWorkerReg';
import './style.scss';
function App() {
    const [activeDate, setActiveDate] = useState(new Date());
    const [ activeTab, setActiveTab ] = useState(1);
    var query = FETCH_BIRDAYS_DATE_QUERY;
    var variables = { date: activeDate };
    if(activeTab === 2){
        query = FETCH_BIRTHDAYS_MONTH_QUERY
        const month = activeDate.getMonth();
        variables = {month}
    }
    const { loading, data, error } = useQuery(query, { variables });
    const handleTabChange = (n) => {
        if(n === 1) setActiveDate(new Date());
        setActiveTab(n);
    }
    const handleDateChange = (date) => {
        setActiveDate(date);
        if(activeTab === 2){
            //TODO: Scroll to the person item
        }
    }
    const title = activeTab === 1? getDayOfWeek(activeDate) : monthName(activeDate) + " " + activeDate.getFullYear();
    if(error) return (<Error error={error.message}/>)
    return (
        <div className="app">
            <Container>
                <AppBar title={title}></AppBar>
                <Calendar variant={activeTab === 2 ? "full" : "partial"} value={activeDate} onChange={handleDateChange}/>
            </Container>
            <main className="main" role="main">
                <div className="contact-list__container">
                    <ContactList data={data?.getBirthdatesByDate || data?.getBirthdatesByMonth || []} loading={loading}/>
                </div>
            </main>
            <TabBar onChange={handleTabChange} />
        </div>
    )
}
registerServiceWorker();

export default App;