import { useQuery } from '@apollo/client';
import React, { useState } from 'react'
import { FormattedDate, useIntl } from 'react-intl';
import Calendar from '../../components/Calendar';
import Container from '../../components/Container';
import Error from '../../components/Error';
import { FETCH_BIRTHDAYS_MONTH_QUERY } from '../../lib/graphql/queries';
import AppBar from '../../components/Sections/AppBar';
import  MainContainer  from '../../components/Sections/MainContainer';
import  TabBar  from '../../components/Sections/TabBar';
export default function Events() {
    const intl = useIntl();
    const [activeDate, setActiveDate] = useState(new Date());
    const { loading, data, error } = useQuery(FETCH_BIRTHDAYS_MONTH_QUERY, { variables: { month: activeDate.getMonth() }, fetchPolicy: 'cache-and-network' });
    const handleDateChange = (date) => {
        setActiveDate(date);
    }
    if (error) return <Error error={error.message} action="reload" />
    return (
        <div>
            <Container>
                <AppBar title={<FormattedDate value={activeDate} month="short" year="numeric" />} />
                <Calendar locale={intl.locale} variant={"full"} value={activeDate} onChange={handleDateChange} />
            </Container>
            <MainContainer data={data?.getBirthdatesByMonth} loading={loading}/>
            <TabBar />
        </div>
    )
}
