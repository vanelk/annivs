import React from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { useAppState } from '../context/AppProvider';
import GoogleButton from '../components/GoogleButton';
import Container from '../components/Container';
import { ReactComponent as LogoSvg } from '../assets/images/icon.svg'
import './style.scss';
export default function Home() {
    const { appState } = useAppState();
    const { state } = useLocation();
    if (appState.token) {
        return <Redirect to={state?.from || '/app'} />
    }
    return (
        <div className="login">
            <div className="login-container">
                <Container>
                    <div className="icon-container">
                        <LogoSvg />
                    </div>
                    <div className="text-container">
                        <h1 className="text-primary">Happybd</h1>
                        <div className="text-secondary">
                            Never forget a birthday again
                    </div>
                    </div>
                    <a className="no-decoration" href="/auth/login">
                        <GoogleButton />
                    </a>
                </Container>
            </div>
        </div>
    )
}
