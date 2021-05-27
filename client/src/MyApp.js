import React, { useState, useEffect } from 'react'
import Loader from './components/Loader';
import Routes from './Routes';
import { useAppState } from './context/AppProvider';
import withApollo from './context/ApolloProvider';
import ErrorHandler from './components/ErrorHandler';
function MyApp() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { setAuthToken } = useAppState();
    useEffect(() => {
        setLoading(true);
        fetch("/refresh_token", { method: 'POST' }).then(res => res.json())
            .then(({ accessToken }) => {
                setAuthToken(accessToken);
                setLoading(false);
            }).catch((e) => {
                setError(e.message);
                setLoading(false);
            });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    if (loading) return ( <Loader /> );
    if (error) return ( <ErrorHandler error={error} /> );
    return ( <Routes /> )
}

export default withApollo(MyApp);