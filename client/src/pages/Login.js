import React from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { useAppState } from '../context/AppProvider';
import GoogleButton from '../components/GoogleButton/index';
import Container from '../components/Container/index';
export default function Home() {
    const { appState } = useAppState();
    const { state } = useLocation();
    if (appState.token) {
        return <Redirect to={state?.from || '/app'} />
    }
    return (
        <div className="login">
            <Container className="text-center">
                <h1>Happybd</h1>
                <a className="no-decoration" href="http://localhost:5000/auth/login">
                    <GoogleButton />
                </a>
            </Container>
        </div>
    )
}
