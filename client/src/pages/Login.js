import React from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { useAppState } from '../context/AppProvider';
import GoogleButton from '../components/GoogleButton';
import Container from '../components/Container';
export default function Home() {
    const { appState } = useAppState();
    const { state } = useLocation();
    if (appState.token) {
        return <Redirect to={state?.from || '/app'} />
    }
    return (
        <div className="login">
            <Container className="text-center">
                <a className="no-decoration" href="http://localhost:5000/auth/login">
                    <GoogleButton />
                </a>
            </Container>
        </div>
    )
}
